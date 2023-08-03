const axios = require("axios");

const updateState = () => {
    axios
        .post(
            `http://localhost:9011/monitor/status/update`,
            {
                mount_dir: {
                    "/dev/nvme0n1p1": {
                        media_dir: "/media/lhz/nvme0n1p1",
                        time_stamp: 1690264651.0641866,
                        total_size: 0,
                        upload_status: 0,
                        recorders: {}
                    },
                    "/dev/sdb1": {
                        media_dir: "/media/lhz/sata",
                        time_stamp: 1690264733.2685053,
                        total_size: 0,
                        upload_status: 0,
                        recorders: {}
                    }
                },
                log: {
                    timestamp: 1690265286,
                    ip: "127.0.0.1",
                    type: 1,
                    content: "Discover a world of possibilities with our innovative products and services."
                }
            }
        )
        .then((v) => {
            console.info(v.data);
        });
};

updateState();
