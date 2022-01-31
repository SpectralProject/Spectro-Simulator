pub struct CPUCluster;

pub type MHz = f32;
pub type reg64 = u64;

pub struct CPUCore {
    // SUPER THREADING
    alu_threads: [ALU; 2],

    // LOCAL CACHES
    l1_dcache: CPUCache,
    l1_icache: CPUCache,
    l2_dcache: CPUCache,

    max_freq: MHz,
    register_file: Vec<reg64>,
}

pub struct ALU;

impl ALU {
    pub fn add(&self, x: u64, y: u64) -> u64 {
        x + y
    }
    pub fn sub(&self, x: u64, y: u64) -> u64 {
        x - y
    }
    pub fn mult(&self, x: u64, y: u64) -> u64 {
        x * y
    }
    pub fn div(&self, x: u64, y: u64) -> u64 {
        x / y
    }
}

use crate::ram::SRAMChip;
pub struct CPUCache {
    sram: SRAMChip,
}

impl CPUCache {
    fn new(amount_kb: u64) -> CPUCache {
        CPUCache { sram: SRAMChip }
    }
}

// TESTS

#[test]
fn test_cpu_cache() {
    let cpu_cache = CPUCache::new(64);
}

#[test]
fn test_alu_basics() {
    let alu = ALU {};
    let res = alu.add(0, 1);
    assert_eq!(res, 1);

    let res = alu.div(10, 5);
    assert_eq!(res, 2);
}

#[test]
#[should_panic]
fn critical_cases() {
    // expected fail
    let alu = ALU {};
    let res = alu.div(10, 0);
}
