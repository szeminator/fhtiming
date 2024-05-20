// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Menu, Submenu, MenuItem, WindowMenuEvent, Manager, AppHandle};

fn main() {
    let context = tauri::generate_context!();

    // Define menu items with unique IDs
    let chart = CustomMenuItem::new("chart", "Chart");
    let impressum = CustomMenuItem::new("impressum", "Impressum");
    let table = CustomMenuItem::new("table", "Table");
    let start_dialog = CustomMenuItem::new("start_dialog", "Start");

    let dark_mode = CustomMenuItem::new("dark_mode", "Dark Mode");
    let light_mode = CustomMenuItem::new("light_mode", "Light Mode");

    let save = CustomMenuItem::new("save", "Save Config");
    let load = CustomMenuItem::new("load", "Load Config");


    let file_submenu = Submenu::new(
        "File",
        Menu::new().add_item(save)
            .add_item(load),
    );

    // Define a view submenu
    let view_submenu = Submenu::new(
        "View",
        Menu::new()
            .add_item(chart)
            .add_item(table)
            .add_item(impressum)
            .add_item(start_dialog),
    );

    let window_submenu = Submenu::new(
        "Window",
        Menu::new()
            .add_item(dark_mode)
            .add_item(light_mode),
    );

    // Create the main menu with the view submenu
    let menu = Menu::new()
        .add_submenu(file_submenu)
        .add_submenu(view_submenu)
        .add_submenu(window_submenu);

    tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event: WindowMenuEvent| match event.menu_item_id() {
            "chart" => event.window().emit("navigate", "/chart").unwrap(),
            "impressum" => event.window().emit("navigate", "/impressum").unwrap(),
            "table" => event.window().emit("navigate", "/table").unwrap(),
            "start_dialog" => event.window().emit("navigate", "/").unwrap(),
            "dark_mode" => event.window().emit("change-theme", "dark").unwrap(),
            "light_mode" => event.window().emit("change-theme", "light").unwrap(),
            "save" => event.window().emit("save_data", ()).unwrap(),
            "load" => event.window().emit("load_data", ()).unwrap(),

            _ => {}
        })
        .run(context)
        .expect("error while running tauri application");
}

