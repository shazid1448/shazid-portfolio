/**
 * Database Seeder: Populates Shazid Ahmed Bondhon's complete CV data for MySQL & SQLite fallback
 */

const path = require('path');
module.paths.push(path.join(__dirname, '../backend/node_modules'));

const mysql = require('mysql2/promise');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

async function seed() {
  console.log('Seeding Database with Shazid Ahmed Bondhon CV Data...');
  
  let useMysql = false;
  let mysqlConn = null;

  try {
    mysqlConn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      connectTimeout: 2000,
      multipleStatements: true
    });
    useMysql = true;
    console.log('Connected to MySQL server.');
  } catch (e) {
    console.log('MySQL connection failed/denied. Seeding SQLite database...');
  }

  const profilePicUrl = '/profile.jpg';

  const profileData = [
    'Shazid Ahmed Bondhon',
    'Software Engineering Student & Full-Stack Developer',
    'I am a Software Engineering student at Daffodil International University, committed to continuous learning and personal growth. My academic journey reflects my interest in cross-cultural learning, leadership, and adaptability through coursework, projects, and community involvement. I aim to integrate technical expertise with teamwork to contribute meaningfully to both local and global communities.',
    'ashazid5@gmail.com',
    'Mirpur-1, Dhaka, Bangladesh',
    'https://github.com/shazidahmed',
    'https://linkedin.com/in/shazid-ahmed-bondhon-b6a86b33b',
    profilePicUrl,
    10,
    12,
    3,
    6
  ];

  const skillsData = [
    ['Java', 'Programming', 88, 'FileCode'],
    ['C Programming', 'Programming', 82, 'Cpu'],
    ['JavaScript', 'Frontend', 90, 'Code'],
    ['HTML5 / CSS3', 'Frontend', 92, 'Layout'],
    ['PHP', 'Backend', 78, 'Server'],
    ['React.js', 'Frontend', 90, 'Atom'],
    ['Node.js & Express.js', 'Backend', 85, 'Server'],
    ['REST APIs', 'Backend', 88, 'Globe'],
    ['MySQL', 'Database', 85, 'Database'],
    ['Microsoft Office', 'Tools', 95, 'Monitor'],
    ['Git & GitHub', 'Tools', 90, 'GitBranch'],
    ['Leadership & Team Management', 'Tools', 95, 'Users']
  ];

  const projectsData = [
    {
      title: 'Smart Agriculture Prototype (Standup Hackathon)',
      slug: 'smart-agriculture-prototype',
      description: 'An innovative IT solution for the agriculture sector presented at The Standup Hackathon (DIU), helping farmers monitor crop health and resource allocation.',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
      category: 'Full Stack',
      github_url: 'https://github.com/shazidahmed/smart-agriculture',
      live_url: 'https://smart-agri.example.com',
      featured: 1,
      technologies: ['Java', 'C Programing', 'HTML', 'JavaScript']
    },
    {
      title: 'Student Portal & Learning System',
      slug: 'student-portal',
      description: 'A comprehensive academic portal for university students to track courses, assignments, grades, and schedules with real-time updates and interactive dashboards.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
      category: 'Full Stack',
      github_url: 'https://github.com/shazidahmed/student-portal',
      live_url: 'https://student-portal.example.com',
      featured: 1,
      technologies: ['React', 'Node.js', 'Express', 'MySQL']
    },
    {
      title: 'Personal Portfolio Web Application',
      slug: 'personal-portfolio',
      description: 'A modern, responsive full-stack portfolio application with an admin panel, authentication, dynamic statistics, and project filtering.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=800',
      category: 'Full Stack',
      github_url: 'https://github.com/shazidahmed/personal-portfolio',
      live_url: 'https://shazidahmed.com',
      featured: 1,
      technologies: ['React', 'Vite', 'Node.js', 'MySQL', 'JWT']
    }
  ];

  const educationData = [
    [
      'Daffodil International University (DIU)',
      'BSc. in Software Engineering',
      'Engineering / Computer Science',
      'Jan 2024',
      'Present',
      1,
      'Current CGPA: 3.54 out of 4.00 (Current). Savar, Dhaka. Active in Club Activity, Community Building, Learning Coding, Tutoring, Attending Seminars, and Community Services.'
    ],
    [
      'Milestone College',
      'Higher Secondary Certificate (HSC)',
      'Science',
      '2019',
      '2021',
      0,
      'Final Grade: 5.00 out of 5.00. Dhaka. Extra Curricular Activities: Social activities, Debating, Cricket, Football, and Volleyball.'
    ],
    [
      'Jhikargacha GOVT. M.L Model High School',
      'Secondary School Certificate (SSC)',
      'Science',
      '2017',
      '2018',
      0,
      'Final Grade: 4.72 out of 5.00. Jhikargacha, Jashore. Extra Curricular Activities: Student Cabinet, Social Activities, Cricket, Football, Badminton, and Volleyball.'
    ]
  ];

  const experienceData = [
    [
      'Group Leader & Team Commander',
      'Inter Service Selection Board (ISSB)',
      'Bangladesh',
      '2023',
      '2024',
      0,
      'Twice participated as a candidate monitored by Bangladesh Army, Navy & Air Force higher officers. Led 12-member teams in Progressive Group Task (PGT), Half Group Task (HGT), Command Task (CT as Commander), and Group Planning & Discussion sessions.',
      'Leadership, Strategic Planning, Command Task, Team Management'
    ],
    [
      'Blood Donation & Community Service Manager',
      'Jagroto Bangla Foundation',
      'Dhaka, Bangladesh',
      '2019',
      'Present',
      1,
      'Regular A(+ve) blood donor and manager for foundation blood donation programs. Responsible for donor search, database management, physical fitness screening, and organizing national event blood drives (e.g., 21st February).',
      'Community Service, Donor Management, Event Planning'
    ]
  ];

  const achievementsData = [
    [
      'The Standup Hackathon - Agriculture Prototype',
      'Participated in The Standup Hackathon organized by Software Engineering Club & DIU, presenting an IT prototype solution for the agriculture sector.',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
      '16 Nov 2024',
      'https://github.com/shazidahmed'
    ],
    [
      'CodeTrap Programming Contest',
      'Participated in CodeTrap Programming Contest organized by Software Engineering Student Department at Daffodil International University.',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      '16 Mar 2025',
      'https://github.com/shazidahmed'
    ],
    [
      'Bangladesh Biology Olympiad - Regional Stage',
      'Attended the 5th Bangladesh Biology Olympiad regional stage competition in 2019.',
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
      '9 Mar 2019',
      ''
    ],
    [
      'Learning Exhibition of Art of Living Program',
      'Exhibited presentation on Social Media in Today’s World, Digital Reputation, Online Identity, and Global Opportunities at DIU.',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
      '19 Aug 2025',
      ''
    ],
    [
      'Mega City 7.5K Run 2024',
      'Successfully completed 7.5 KM marathon event in 62 minutes organized by Chase Track.',
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800',
      '6 Sep 2024',
      ''
    ],
    [
      'Awareness Run & Walk 3K Run 2024',
      'Successfully completed first 3 KM running event in 25 minutes organized by Psoriasis Awareness Club & Ultra Camp Runners.',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
      '10 May 2024',
      ''
    ]
  ];

  const settingsData = [
    ['site_title', 'Shazid Ahmed Bondhon | Software Engineering Student & Full-Stack Developer'],
    ['site_description', 'Official personal portfolio of Shazid Ahmed Bondhon featuring CV details, education, experience, achievements, and projects.'],
    ['contact_email', 'ashazid5@gmail.com'],
    ['phone_number', '(+880) 1790599662'],
    ['address', 'House 16, Road 2, Block F, Mirpur-1, 1216 Dhaka, Bangladesh'],
    ['github_url', 'https://github.com/shazidahmed'],
    ['linkedin_url', 'https://linkedin.com/in/shazid-ahmed-bondhon-b6a86b33b']
  ];

  if (useMysql) {
    try {
      const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
      await mysqlConn.query(schemaSql);
      await mysqlConn.changeUser({ database: process.env.DB_NAME || 'shazid_portfolio' });

      // Seed Admin
      const [adminRows] = await mysqlConn.query('SELECT * FROM admins WHERE email = ?', ['admin@shazidahmed.com']);
      if (adminRows.length === 0) {
        const hashedPassword = await bcrypt.hash('Admin@123456', 10);
        await mysqlConn.query('INSERT INTO admins (username, email, password) VALUES (?, ?, ?)', ['shazid_admin', 'admin@shazidahmed.com', hashedPassword]);
        console.log('Admin account created.');
      }

      // Seed Profile
      await mysqlConn.query('DELETE FROM profile WHERE id = 1');
      await mysqlConn.query(
        `INSERT INTO profile (id, name, title, bio, email, location, github, linkedin, profile_image, projects_count, technologies_count, years_learning, achievements_count) 
         VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        profileData
      );

      // Seed Skills
      await mysqlConn.query('DELETE FROM skills');
      await mysqlConn.query('INSERT INTO skills (name, category, level, icon) VALUES ?', [skillsData]);

      // Seed Projects
      await mysqlConn.query('DELETE FROM project_technologies');
      await mysqlConn.query('DELETE FROM projects');
      for (const p of projectsData) {
        const [res] = await mysqlConn.query(
          'INSERT INTO projects (title, slug, description, image, category, github_url, live_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [p.title, p.slug, p.description, p.image, p.category, p.github_url, p.live_url, p.featured]
        );
        const pId = res.insertId;
        const techValues = p.technologies.map(t => [pId, t]);
        await mysqlConn.query('INSERT INTO project_technologies (project_id, technology) VALUES ?', [techValues]);
      }

      // Seed Education
      await mysqlConn.query('DELETE FROM education');
      for (const e of educationData) {
        await mysqlConn.query(
          'INSERT INTO education (institution, degree, field, start_date, end_date, is_current, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
          e
        );
      }

      // Seed Experience
      await mysqlConn.query('DELETE FROM experience');
      for (const ex of experienceData) {
        await mysqlConn.query(
          'INSERT INTO experience (position, company, location, start_date, end_date, is_current, description, technologies) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          ex
        );
      }

      // Seed Achievements
      await mysqlConn.query('DELETE FROM achievements');
      await mysqlConn.query('INSERT INTO achievements (title, description, image, achievement_date, external_url) VALUES ?', [achievementsData]);

      // Seed Settings
      await mysqlConn.query('DELETE FROM settings');
      for (const s of settingsData) {
        await mysqlConn.query('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)', s);
      }

      console.log('MySQL Database Seeded Successfully!');
      await mysqlConn.end();
      return;
    } catch (err) {
      console.error('MySQL seeding error:', err);
      if (mysqlConn) await mysqlConn.end();
    }
  }

  // SQLite Fallback Seeding
  const dbFile = path.join(__dirname, 'shazid_portfolio.sqlite');
  const db = new sqlite3.Database(dbFile);

  const runSql = (sql, params = []) => new Promise((res, rej) => db.run(sql, params, function(err) { err ? rej(err) : res(this); }));
  const getSql = (sql, params = []) => new Promise((res, rej) => db.get(sql, params, (err, row) => err ? rej(err) : res(row)));

  try {
    await runSql(`CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);

    await runSql(`CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY DEFAULT 1,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      bio TEXT NOT NULL,
      email TEXT NOT NULL,
      location TEXT NOT NULL,
      github TEXT NOT NULL,
      linkedin TEXT NOT NULL,
      profile_image TEXT,
      projects_count INTEGER DEFAULT 0,
      technologies_count INTEGER DEFAULT 0,
      years_learning INTEGER DEFAULT 0,
      achievements_count INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);

    await runSql(`CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      level INTEGER DEFAULT 80,
      icon TEXT DEFAULT 'Code',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);

    await runSql(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      category TEXT DEFAULT 'Full Stack',
      github_url TEXT,
      live_url TEXT,
      featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);

    await runSql(`CREATE TABLE IF NOT EXISTS project_technologies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      technology TEXT NOT NULL,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    );`);

    await runSql(`CREATE TABLE IF NOT EXISTS education (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      institution TEXT NOT NULL,
      degree TEXT NOT NULL,
      field TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT DEFAULT 'Present',
      is_current INTEGER DEFAULT 0,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);

    await runSql(`CREATE TABLE IF NOT EXISTS experience (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      position TEXT NOT NULL,
      company TEXT NOT NULL,
      location TEXT,
      start_date TEXT NOT NULL,
      end_date TEXT DEFAULT 'Present',
      is_current INTEGER DEFAULT 0,
      description TEXT,
      technologies TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);

    await runSql(`CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      achievement_date TEXT,
      external_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);

    await runSql(`CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);

    await runSql(`CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      setting_key TEXT UNIQUE NOT NULL,
      setting_value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);

    // Seed admin
    const admin = await getSql('SELECT * FROM admins WHERE email = ?', ['admin@shazidahmed.com']);
    if (!admin) {
      const hashedPassword = await bcrypt.hash('Admin@123456', 10);
      await runSql('INSERT INTO admins (username, email, password) VALUES (?, ?, ?)', ['shazid_admin', 'admin@shazidahmed.com', hashedPassword]);
      console.log('SQLite: Default Admin created (admin@shazidahmed.com / Admin@123456)');
    }

    // Seed profile
    await runSql('DELETE FROM profile');
    await runSql(
      `INSERT INTO profile (id, name, title, bio, email, location, github, linkedin, profile_image, projects_count, technologies_count, years_learning, achievements_count) 
       VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      profileData
    );
    console.log('SQLite: Profile seeded.');

    // Seed skills
    await runSql('DELETE FROM skills');
    for (const s of skillsData) {
      await runSql('INSERT INTO skills (name, category, level, icon) VALUES (?, ?, ?, ?)', s);
    }
    console.log('SQLite: Skills seeded.');

    // Seed projects
    await runSql('DELETE FROM project_technologies');
    await runSql('DELETE FROM projects');
    for (const p of projectsData) {
      const res = await runSql(
        'INSERT INTO projects (title, slug, description, image, category, github_url, live_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [p.title, p.slug, p.description, p.image, p.category, p.github_url, p.live_url, p.featured]
      );
      for (const t of p.technologies) {
        await runSql('INSERT INTO project_technologies (project_id, technology) VALUES (?, ?)', [res.lastID, t]);
      }
    }
    console.log('SQLite: Projects seeded.');

    // Seed Education
    await runSql('DELETE FROM education');
    for (const e of educationData) {
      await runSql(
        'INSERT INTO education (institution, degree, field, start_date, end_date, is_current, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
        e
      );
    }
    console.log('SQLite: Education seeded.');

    // Seed Experience
    await runSql('DELETE FROM experience');
    for (const ex of experienceData) {
      await runSql(
        'INSERT INTO experience (position, company, location, start_date, end_date, is_current, description, technologies) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        ex
      );
    }
    console.log('SQLite: Experience seeded.');

    // Seed Achievements
    await runSql('DELETE FROM achievements');
    for (const a of achievementsData) {
      await runSql('INSERT INTO achievements (title, description, image, achievement_date, external_url) VALUES (?, ?, ?, ?, ?)', a);
    }
    console.log('SQLite: Achievements seeded.');

    // Seed Settings
    await runSql('DELETE FROM settings');
    for (const s of settingsData) {
      await runSql('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)', s);
    }
    console.log('SQLite: Settings seeded.');

    console.log('SQLite Database Seeded Successfully with Shazid Ahmed Bondhon CV Data!');
  } catch (e) {
    console.error('SQLite seeding error:', e);
  } finally {
    db.close();
  }
}

seed();
