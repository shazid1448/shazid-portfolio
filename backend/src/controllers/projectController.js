/**
 * Project Controller: CRUD operations for portfolio projects and technologies
 */

const db = require('../config/database');

/**
 * Helper function to attach technologies array to each project object
 */
async function attachTechnologies(projects) {
  if (projects.length === 0) return [];
  const projectIds = projects.map(p => p.id);
  
  let techRows = [];
  try {
    const [rows] = await db.query(`SELECT * FROM project_technologies WHERE project_id IN (${projectIds.map(() => '?').join(',')})`, projectIds);
    techRows = rows;
  } catch (e) {
    techRows = [];
  }

  const techMap = {};
  techRows.forEach(t => {
    if (!techMap[t.project_id]) techMap[t.project_id] = [];
    techMap[t.project_id].push(t.technology);
  });

  return projects.map(p => ({
    ...p,
    technologies: techMap[p.id] || []
  }));
}

/**
 * Retrieves all portfolio projects with associated technology stacks
 */
exports.getProjects = async (req, res, next) => {
  try {
    const [projects] = await db.query('SELECT * FROM projects ORDER BY featured DESC, created_at DESC');
    const result = await attachTechnologies(projects);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

/**
 * Retrieves a single project detail by its URL slug
 */
exports.getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const [projects] = await db.query('SELECT * FROM projects WHERE slug = ?', [slug]);
    if (projects.length === 0) return res.status(404).json({ success: false, message: 'Project not found.' });
    const result = await attachTechnologies(projects);
    res.json({ success: true, data: result[0] });
  } catch (err) { next(err); }
};

/**
 * Creates a new portfolio project along with its technology tags
 */
exports.createProject = async (req, res, next) => {
  try {
    const { title, slug, description, image, category, github_url, live_url, featured, technologies } = req.body;
    const cleanSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const [resProj] = await db.query(
      'INSERT INTO projects (title, slug, description, image, category, github_url, live_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, cleanSlug, description, image, category || 'Full Stack', github_url, live_url, featured ? 1 : 0]
    );

    const projectId = resProj.insertId;
    if (Array.isArray(technologies) && technologies.length > 0) {
      const techValues = technologies.map(t => [projectId, t]);
      await db.query('INSERT INTO project_technologies (project_id, technology) VALUES ?', [techValues]);
    }

    res.status(201).json({ success: true, message: 'Project created.', id: projectId });
  } catch (err) { next(err); }
};

/**
 * Updates an existing portfolio project details and replaces its technology tags
 */
exports.updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, slug, description, image, category, github_url, live_url, featured, technologies } = req.body;

    await db.query(
      'UPDATE projects SET title = ?, slug = ?, description = ?, image = ?, category = ?, github_url = ?, live_url = ?, featured = ? WHERE id = ?',
      [title, slug, description, image, category, github_url, live_url, featured ? 1 : 0, id]
    );

    await db.query('DELETE FROM project_technologies WHERE project_id = ?', [id]);
    if (Array.isArray(technologies) && technologies.length > 0) {
      const techValues = technologies.map(t => [id, t]);
      await db.query('INSERT INTO project_technologies (project_id, technology) VALUES ?', [techValues]);
    }

    res.json({ success: true, message: 'Project updated.' });
  } catch (err) { next(err); }
};

/**
 * Deletes a portfolio project and its associated technologies from the database
 */
exports.deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ success: true, message: 'Project deleted.' });
  } catch (err) { next(err); }
};
