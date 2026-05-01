#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn reveal_path(path: String) -> Result<(), String> {
  #[cfg(target_os = "windows")]
  {
    let path_buf = std::path::PathBuf::from(&path);
    let mut command = std::process::Command::new("explorer.exe");

    if path_buf.is_file() {
      command.arg(format!("/select,{}", path));
    } else {
      command.arg(path);
    }

    command.spawn().map_err(|error| error.to_string())?;
    return Ok(());
  }

  #[cfg(target_os = "macos")]
  {
    std::process::Command::new("open")
      .arg("-R")
      .arg(path)
      .spawn()
      .map_err(|error| error.to_string())?;
    return Ok(());
  }

  #[cfg(all(unix, not(target_os = "macos")))]
  {
    let target = std::path::Path::new(&path);
    let folder = if target.is_file() {
      target.parent().unwrap_or(target)
    } else {
      target
    };

    std::process::Command::new("xdg-open")
      .arg(folder)
      .spawn()
      .map_err(|error| error.to_string())?;
    return Ok(());
  }
}

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_sql::Builder::default().build())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_fs::init())
    .invoke_handler(tauri::generate_handler![reveal_path])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
