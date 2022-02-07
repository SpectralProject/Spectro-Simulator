// BACKEND (model)
pub(crate) mod hardware;

// drivers
pub(crate) mod drivers;

// vm
pub(crate) mod vm;

// FRONTEND (controller) staticlib
// expose functions for frontend
pub struct VMController;
pub struct MainMemory {
    mem: Vec<u8>,
    n_mb: usize,
}

impl MainMemory {
    pub fn new() -> Self {
        Self {
            mem: vec![0; 8e9 as usize],
            n_mb: 8000,
        }
    }

    pub fn get_binary_view(&self) -> &[u8] {
        &self.mem
    }
}

impl VMController {
    pub fn new() -> Self {
        VMController {}
    }

    pub fn open_window(&self) {
        log::info!("Window opened!");
    }

    pub fn close_window(&self) {
        log::info!("Window closed!");
    }

    pub fn get_memory(&self) -> MainMemory {
        MainMemory::new()
    }

    pub fn get_hardware_details(&self) -> Vec<String> {
        vec!["".to_string()]
    }

    pub fn get_cpu_state(&self) -> String {
        "".to_string()
    }
}

#[test]
fn test_controller() {
    let _controller = VMController::new();

    _controller.open_window();
    _controller.close_window();

    let mem_details = _controller.get_memory();
    let hardware_details = _controller.get_hardware_details();
    let cpu_state = _controller.get_cpu_state();

    // assert the right details
    let mem_view = mem_details.get_binary_view();

    // memory should be completely uninitialised
    // one time check
    #[cfg(feature = "full_check")]
    for mem in mem_view {
        // println!("Byte: {}", mem);
        assert_eq!(mem.to_owned(), 0);
    }

    assert_eq!(cpu_state, "");
    assert_eq!(hardware_details, vec![""]);
}
