import { GoogleDriveService } from '../services/googleDriveService.js';

// Construct lazily so `/health` still works and configuration errors flow through
// the normal JSON error handler rather than crashing module loading.
let service;
function getService() { return service ||= new GoogleDriveService(); }
const publicProject = (project, req) => ({
  id: project.id, title: project.title, description: project.description,
  image: project.image && { id: project.image.id, name: project.image.name, url: `${req.baseUrl}/${project.id}/image` },
  video: project.video && { id: project.video.id, name: project.video.name, shareUrl: `${req.baseUrl}/${project.id}/video` }
});

export async function countFolders(req, res) { res.json({ count: (await getService().listFolders()).length }); }
export async function getFolders(req, res) {
  const drive = getService();
  const folders = await drive.listFolders();
  const projects = await Promise.all(folders.map((folder) => drive.getFolderData(folder)));
  res.json({ folders: projects.map((project) => publicProject(project, req)) });
}
export async function getFolder(req, res) { res.json(publicProject(await getService().getProject(req.params.folderId), req)); }

async function streamMedia(req, res, kind) {
  const drive = getService();
  const media = await drive.getVerifiedMedia(req.params.folderId, kind);
  const response = await drive.streamFile(media.id, req.headers.range);
  const headers = response.headers || {};
  res.status(response.status || (req.headers.range ? 206 : 200));
  res.set({
    'Content-Type': media.mimeType,
    'Content-Disposition': `inline; filename="${media.name.replace(/"/g, '')}"`,
    'Accept-Ranges': 'bytes',
    ...(headers['content-length'] && { 'Content-Length': headers['content-length'] }),
    ...(headers['content-range'] && { 'Content-Range': headers['content-range'] })
  });
  response.data.on('error', (error) => res.destroy(error));
  response.data.pipe(res);
}
export const getImage = (req, res) => streamMedia(req, res, 'image');
export const getVideo = (req, res) => streamMedia(req, res, 'video');
