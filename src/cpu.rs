pub struct CPUCluster;

pub struct CPUCore;

pub struct ALU;

use crate::ram::SRAMChip;
pub struct CPUCache {
    sram: SRAMChip,
}

impl CPUCache {
    fn new(amount_mb: u64) -> CPUCache {
        CPUCache{sram: SRAMChip}
    }
}
