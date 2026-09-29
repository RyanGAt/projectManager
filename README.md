# Project Vault

A Windows desktop workspace for personal, creative and DIY projects.
Manage projects, tasks, notes, build logs, file references, links and costs.
Project records are stored locally in SQLite; no account is required.

## Build the Windows installer

Install Node.js, Rust and the Visual Studio C++ build tools, then run:

```sh
npm ci
npm run tauri build -- --bundles nsis
```

The installer is generated in src-tauri/target/release/bundle/nsis.
This release targets Windows x64 and uses Microsoft WebView2.
The installer is unsigned.

## Development

```sh
npm run tauri dev
```

The app's SQLite database is projectvault.db in its application data directory
(on Windows, normally %APPDATA%/com.local.projectvault).
Back up that directory separately; this release has no built-in backup,
export or cloud synchronisation.

File attachments reference their original paths. Keep cover images in the
Windows Pictures folder for access after restarting. The native file picker
also permits explicitly selected files during the current app session.
Local image access is limited to Pictures rather than all filesystem paths.

Download and usage guide: https://sunshineplunge.co.uk/software/project-vault/
