use crate::cpu::CPUCluster;
use crate::dsp::DSPCore;
use crate::ram::SDRAMChip;
use crate::nic::NetworkChip;
use crate::gpu::GPUChip;
use crate::crypto::CryptoModule;

pub struct Soc {
    core_cluster: CPUCluster,
    dsp: DSPCore,
    ram: SDRAMChip,
    nic: NetworkChip,
    gpu: GPUChip,
    crypto: CryptoModule,
}

impl Soc {
    pub fn new() -> Soc {
        Soc {
            core_cluster: CPUCluster{},
            dsp: DSPCore{},
            ram: SDRAMChip{},
            nic: NetworkChip{},
            gpu: GPUChip{},
            crypto: CryptoModule{}
        }
    }
}
