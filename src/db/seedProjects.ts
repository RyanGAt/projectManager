import type { Project } from '../types/project';
import { getDb } from './database';

type SeedProject = Project & {
  docs: string;
  tasks: string[];
};

const sunshineProjects: SeedProject[] = [
  {
    name: 'Sunshine Plunge Website',
    category: 'Website / Brand',
    status: 'Active',
    priority: 'High',
    progress: 35,
    description: 'Main Sunshine Plunge brand site with a 90s/MTV Downtown/underground cartoon/skate/graffiti vibe.',
    docs: 'Your main brand/site. Keep the visual direction gritty, expressive, and tied to cartoons, graffiti, skating, art, and build logs.',
    tasks: ['Finish homepage', 'Add Projects page', 'Add cartoon section', 'Add graffiti game section', 'Add art gallery', 'Add blog/build logs', 'Improve visual style']
  },
  {
    name: 'Sunshine Plunge Projects Page',
    category: 'Website Feature',
    status: 'Active',
    priority: 'High',
    progress: 25,
    description: 'Dedicated page on Sunshine Plunge to document DIY, modding, art, game, and hardware projects.',
    docs: 'Use this page to showcase projects like Guitar Hero controllers, iPod mods, guitars, Xbox mods, cameras, and other builds.',
    tasks: ['Design Projects page layout', 'Create project cards', 'Add individual project pages', 'Upload project images to ImageKit', 'Add categories', 'Add project writeups']
  },
  {
    name: 'Sludge and Fudge',
    category: 'Cartoon / Animation / Brand Lore',
    status: 'Idea',
    priority: 'High',
    progress: 15,
    description: 'Cartoon/world idea based around you and your cat, connected to Sunshine Plunge lore.',
    docs: 'Could connect to the graffiti game and wider Sunshine Plunge world as characters, comics, animations, or website lore.',
    tasks: ['Finalise character designs', 'Create character bios', 'Make first short comic/animation', 'Add section to website', 'Connect to graffiti game lore']
  },
  {
    name: 'Graffiti Game',
    category: 'Game Dev',
    status: 'Active',
    priority: 'High',
    progress: 30,
    description: 'PS1/low-poly/graffiti/sticker placement style game with Sunshine Plunge references.',
    docs: 'Prototype already had working graffiti sticker placement. Next focus is a simple map, readable objectives, and brand-based details.',
    tasks: ['Design first graybox map', 'Build test level in Godot', 'Add sticker/graffiti placement system', 'Add movement recharge mechanic', 'Add objectives', 'Add Sunshine Plunge/Sludge and Fudge references']
  },
  {
    name: 'Graffitied CRT TV Alley Artwork',
    category: 'Art / Visual Identity',
    status: 'Idea',
    priority: 'Normal',
    progress: 10,
    description: 'Graffitied CRT TV in an alleyway artwork for Sunshine Plunge visuals.',
    docs: 'Could become website art, a game prop, a background image, poster art, or a recurring brand image.',
    tasks: ['Refine non-AI-looking version', 'Make line art version', 'Make web background version', 'Use as Sunshine Plunge landing image']
  },
  {
    name: 'Sunshine Plunge Aesthetic System',
    category: 'Brand Design System',
    status: 'Active',
    priority: 'High',
    progress: 25,
    description: 'Reference system for the gritty, textured, 90s-inspired Sunshine Plunge visual language.',
    docs: 'Style notes: gritty urban alley, graffiti, warm evening lighting, underground comics, MTV Oddities energy, textured and handmade.',
    tasks: ['Create colour palette', 'Collect references', 'Define typography', 'Define image style', 'Make reusable website components']
  },
  {
    name: 'Custom Guitar Hero Controllers',
    category: 'Hardware / Etsy Product',
    status: 'Idea',
    priority: 'High',
    progress: 15,
    description: 'Custom Clone Hero/Guitar Hero controllers under Sunshine Plunge.',
    docs: 'Planned product: Raspberry Pi Pico inside, mechanical switches, 3D-printed buttons, wired controller.',
    tasks: ['Finalise wiring plan', 'Test GP2040-CE firmware', 'Design/print buttons', 'Choose fret switches', 'Choose strum switches', 'Build prototype', 'Create product photos', 'Create Etsy listing']
  },
  {
    name: 'GP2040-CE Guitar Hero Firmware',
    category: 'Firmware / Controller Software',
    status: 'Active',
    priority: 'High',
    progress: 20,
    description: 'Custom Guitar Hero controller firmware work using GPIOs 16-28 and analog whammy.',
    docs: 'Sub-project for the custom controller. Focus on Gamepad.cpp changes, GPIO mapping, and reliable PC testing.',
    tasks: ['Map GPIO pins', 'Add fret inputs', 'Add strum inputs', 'Add whammy input', 'Test on PC', 'Document wiring']
  },
  {
    name: 'Custom iPod Classic',
    category: 'Hardware Mod',
    status: 'Idea',
    priority: 'Normal',
    progress: 5,
    description: 'Custom iPod Classic build as a possible Sunshine Plunge item/content project.',
    docs: 'Could be a product, blog post, or build video once parts and mod direction are chosen.',
    tasks: ['Decide mod type', 'Source parts', 'Replace battery/storage', 'Custom shell/buttons', 'Document build']
  },
  {
    name: 'Original Xbox Crystal Edition Mod',
    category: 'Console Mod / Restoration',
    status: 'Finished',
    priority: 'Normal',
    progress: 85,
    description: 'Hardmod/restoration project for an Original Xbox Crystal Edition.',
    docs: 'Completed work included modchip, hard drive work, TruHeXEn 2021, Error 16/13/21 recovery, dashboard install, thermal paste replacement, and controller repair attempts.',
    tasks: ['Write project story', 'Add photos', 'Explain errors and fixes', 'Add tools/software used', 'Add to Sunshine Plunge Projects page']
  },
  {
    name: 'DIY Digital Camera / Camcorder',
    category: 'Hardware / Camera Build',
    status: 'Active',
    priority: 'High',
    progress: 25,
    description: 'DIY camera/camcorder build using Pi or Orange Pi hardware, vintage shells, physical controls, and battery power.',
    docs: 'One of the strongest Sunshine Plunge-style builds. Ideas include Raspberry Pi/Orange Pi, camcorder shell, Hi8 shell, Pi Zero 2W, OV5647 night vision module, original lens, physical buttons, and 18650 battery.',
    tasks: ['Choose final board: Pi or Orange Pi', 'Test camera module', 'Measure lens/sensor distance', 'Design 3D printed mount', 'Reuse camcorder buttons', 'Add battery power', 'Build case', 'Test vintage lens look', 'Document build']
  },
  {
    name: 'Fisheye Skate Camera',
    category: 'Camera / Skate Video Tool',
    status: 'Idea',
    priority: 'Normal',
    progress: 10,
    description: 'Small DIY camera with a fisheye lens effect like skate videos.',
    docs: 'Related to the DIY camera/camcorder project. Could use Orange Pi Zero 2W and a 3D-printed case.',
    tasks: ['Test fisheye lens options', 'Design small case', 'Add recording button', 'Add battery', 'Test skate-style footage']
  },
  {
    name: '24/7 TV Channel Project',
    category: 'Media / Raspberry Pi App',
    status: 'Idea',
    priority: 'Normal',
    progress: 10,
    description: 'Orange Pi Zero 2W project for a 24/7 TV channel-style media experience.',
    docs: 'Could fit Sunshine Plunge as an always-running weird TV channel with looping schedules and CRT-style visuals.',
    tasks: ['Decide content source', 'Build playback app', 'Add looping schedule', 'Add CRT/TV style interface', 'Run on Orange Pi']
  },
  {
    name: 'ClipStation',
    category: 'Desktop App / Video Tool',
    status: 'Idea',
    priority: 'High',
    progress: 10,
    description: 'Desktop app for clipping funny moments and converting them into short-form edits.',
    docs: 'Planned stack: Electron + Vue + Node, OBS Replay Buffer, FFmpeg, subtitles, vertical crop, background overlays, and TikTok upload later.',
    tasks: ['Watch clips folder', 'Preview clips', 'Process clips with FFmpeg', 'Add subtitles', 'Add vertical crop', 'Add brainrot background', 'Export to local folder', 'Add TikTok upload later']
  },
  {
    name: 'ThePlunge / Brainrot Video Generator',
    category: 'Automation / Video Generation',
    status: 'Active',
    priority: 'Normal',
    progress: 15,
    description: 'Automation project for brainrot-style short videos.',
    docs: 'Started as ThePlunge GitHub repo. Could be rebuilt as a desktop app or improved using useful open-source code.',
    tasks: ['Review current repo', 'Pick useful open-source code', 'Build custom UI', 'Import clips/long videos', 'Auto-edit into shorts', 'Export videos']
  },
  {
    name: 'Reddit/Meme Auto Poster Bot',
    category: 'Automation / Social Media',
    status: 'Idea',
    priority: 'Normal',
    progress: 5,
    description: 'Bot that scrapes Reddit posts, turns them into images, and posts to social platforms.',
    docs: 'Not necessarily Sunshine Plunge-branded, but related to content automation ideas for Instagram, Telegram, and Pinterest.',
    tasks: ['Pick subreddits', 'Generate post images', 'Add captions', 'Add schedule config', 'Post to Telegram', 'Add Instagram later']
  },
  {
    name: 'AIPlunge',
    category: 'AI Agent / Automation / Digital Brand',
    status: 'Idea',
    priority: 'High',
    progress: 10,
    description: 'Autonomous AI-powered digital brand/agent connected to content and income experiments.',
    docs: 'Uses theplunge.agent@gmail.com. Should generate content/assets, explore income methods, and eventually improve itself.',
    tasks: ['Build basic weekly cycle', 'Generate content ideas', 'Generate visuals', 'Generate captions', 'Add affiliate link embedder', 'Add YouTube Shorts uploader', 'Add scheduler', 'Track income experiments']
  },
  {
    name: 'Reseller Command Center / Stock App',
    category: 'App / Business Tool',
    status: 'Active',
    priority: 'High',
    progress: 40,
    description: 'Stock/reselling app for vintage clothing across Vinted, Depop, Tilt, and related platforms.',
    docs: 'Existing/ongoing app. Focus areas include dashboard improvements, email integration, listing support, sales from stock, and a better mockup.',
    tasks: ['Improve dashboard', 'Add email integration', 'Bring back listings as optional', 'Add more stock details', 'Improve sold workflow', 'Add analytics']
  },
  {
    name: 'ProjectVault / Project Manager App',
    category: 'Desktop App',
    status: 'Active',
    priority: 'High',
    progress: 35,
    description: 'The Tauri + Vue + TypeScript + SQLite desktop app currently being built.',
    docs: 'Local Windows .exe project manager for tracking Sunshine Plunge, hardware, game, video, and automation projects.',
    tasks: ['Fix PrimeVue theme import', 'Add missing Tauri icon', 'Run app locally', 'Add your projects', 'Improve UI', 'Add file attachments', 'Add project templates']
  },
  {
    name: 'Pi/Orange Pi Media Center App',
    category: 'Pi App / Media Interface',
    status: 'Idea',
    priority: 'Normal',
    progress: 5,
    description: 'Media-center-style app/OS for Orange Pi Zero 2W.',
    docs: 'Designed to plug in and act like a TV-friendly media center for consuming media.',
    tasks: ['Design TV-friendly UI', 'Build local app', 'Add controller/remote support', 'Add media sources', 'Test on Orange Pi']
  }
];

export const seedSunshineProjects = async () => {
  const db = await getDb();
  let insertedProjects = 0;
  let insertedTasks = 0;
  let insertedDocs = 0;

  for (const project of sunshineProjects) {
    const existingProjects = await db.select('SELECT id FROM projects WHERE name = ?', [project.name]) as { id: number }[];
    let projectId = existingProjects[0]?.id;

    if (!projectId) {
      await db.execute(
        `INSERT INTO projects (name, description, category, status, priority, progress, cover_image_path)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          project.name,
          project.description || '',
          project.category || '',
          project.status || 'Idea',
          project.priority || 'Normal',
          project.progress || 0,
          project.cover_image_path || ''
        ]
      );
      insertedProjects += 1;
      const rows = await db.select('SELECT id FROM projects WHERE name = ?', [project.name]) as { id: number }[];
      projectId = rows[0]?.id;
    }

    if (!projectId) continue;

    const existingDocs = await db.select(
      'SELECT id FROM project_logs WHERE project_id = ? AND title = ?',
      [projectId, 'Project brief']
    ) as { id: number }[];

    if (!existingDocs.length) {
      await db.execute(
        'INSERT INTO project_logs (project_id, title, content) VALUES (?, ?, ?)',
        [projectId, 'Project brief', project.docs]
      );
      insertedDocs += 1;
    }

    for (let index = 0; index < project.tasks.length; index += 1) {
      const task = project.tasks[index];
      const existingTasks = await db.select(
        'SELECT id FROM tasks WHERE project_id = ? AND title = ?',
        [projectId, task]
      ) as { id: number }[];

      if (existingTasks.length) continue;

      await db.execute(
        'INSERT INTO tasks (project_id, title, status, priority, sort_order) VALUES (?, ?, ?, ?, ?)',
        [projectId, task, 'Todo', project.priority || 'Normal', index]
      );
      insertedTasks += 1;
    }
  }

  return { insertedProjects, insertedTasks, insertedDocs };
};
