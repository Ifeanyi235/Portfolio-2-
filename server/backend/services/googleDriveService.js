import { createDriveClient } from '../config/googleAuth.js';

const FOLDER_MIME = 'application/vnd.google-apps.folder';
const IMAGE_PREFIX = 'image/';
const VIDEO_PREFIX = 'video/';
const fields = 'nextPageToken,files(id,name,mimeType,description,parents,size,modifiedTime)';

function driveError(error) {
  const status = error?.code || error?.response?.status;
  const message = error?.errors?.[0]?.message || error?.response?.data?.error?.message || error.message;
  const wrapped = new Error(message || 'Google Drive request failed');
  wrapped.status = status;
  return wrapped;
}

export class GoogleDriveService {
  constructor() {
    this.drive = createDriveClient();
    this.rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
    if (!this.rootFolderId) throw new Error('GOOGLE_DRIVE_ROOT_FOLDER_ID is required.');
  }

  async listAll(query, requestedFields = fields) {
    const files = [];
    let pageToken;
    do {
      try {
        const { data } = await this.drive.files.list({
          q: query,
          pageToken,
          pageSize: 1000,
          fields: requestedFields,
          orderBy: 'name',
          supportsAllDrives: true,
          includeItemsFromAllDrives: true
        });
        files.push(...(data.files || []));
        pageToken = data.nextPageToken;
      } catch (error) { throw driveError(error); }
    } while (pageToken);
    return files;
  }

  async listFolders() {
    return this.listAll(`'${this.rootFolderId}' in parents and mimeType = '${FOLDER_MIME}' and trashed = false`);
  }

  async getFolder(folderId) {
    try {
      const { data } = await this.drive.files.get({
        fileId: folderId,
        fields: 'id,name,mimeType,description,parents',
        supportsAllDrives: true
      });
      if (data.mimeType !== FOLDER_MIME || !data.parents?.includes(this.rootFolderId)) {
        const error = new Error('Folder not found in the configured application root.'); error.status = 404; throw error;
      }
      return data;
    } catch (error) { throw error.status ? error : driveError(error); }
  }

  pickMedia(files, prefix, preferredName) {
    const matching = files.filter((file) => file.mimeType?.startsWith(prefix));
    if (!matching.length) return null;
    const preferred = preferredName?.trim().toLowerCase();
    return matching.sort((a, b) => {
      const aPreferred = preferred && a.name.toLowerCase().includes(preferred) ? 1 : 0;
      const bPreferred = preferred && b.name.toLowerCase().includes(preferred) ? 1 : 0;
      return bPreferred - aPreferred || new Date(b.modifiedTime) - new Date(a.modifiedTime) || a.name.localeCompare(b.name);
    })[0];
  }

  async getFolderData(folder) {
    const children = await this.listAll(`'${folder.id}' in parents and trashed = false`);
    return {
      id: folder.id,
      title: folder.name,
      description: folder.description || '',
      image: this.pickMedia(children, IMAGE_PREFIX, process.env.PREFERRED_IMAGE_NAME),
      video: this.pickMedia(children, VIDEO_PREFIX, process.env.PREFERRED_VIDEO_NAME)
    };
  }

  async getProject(folderId) { return this.getFolderData(await this.getFolder(folderId)); }

  async getVerifiedMedia(folderId, kind) {
    const project = await this.getProject(folderId);
    const media = project[kind];
    if (!media) { const error = new Error(`${kind === 'image' ? 'Image' : 'Video'} file not found in this folder.`); error.status = 404; throw error; }
    return media;
  }

  async streamFile(fileId, range) {
    try {
      return await this.drive.files.get({ fileId, alt: 'media', supportsAllDrives: true }, { responseType: 'stream', headers: range ? { Range: range } : undefined });
    } catch (error) { throw driveError(error); }
  }
}
