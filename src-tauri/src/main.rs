// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            
            #[cfg(target_os = "macos")]
            {
                // Bypass macOS security
                window.set_transparent_titlebar(true);
                window.set_effects(tauri::WindowEffects::TRANSPARENT);
            }
            
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}