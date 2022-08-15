import platoi from "../../../assets/images/marketplaceSoon/platoi.png";
import platoisampledata from "../../../assets/images/marketplaceSoon/platoisampledata.png";
import platoisampledata2 from "../../../assets/images/marketplaceSoon/platoisampledata2.png";
import platoisampledata3 from "../../../assets/images/marketplaceSoon/platoisampledata3.png";
import platoisampledata4 from "../../../assets/images/marketplaceSoon/platoisampledata4.png";
import picterrasm from "../../../assets/images/marketplaceSoon/picterra.png";
import orbitalsm from "../../../assets/images/marketplaceSoon/orbital.png";
import picterrasampledata from "../../../assets/images/marketplaceSoon/picterrasampledata.png";
import picterrasampledata2 from "../../../assets/images/marketplaceSoon/picterrasampledata2.png";
import aircraftsampledata from "../../../assets/images/marketplaceSoon/aircraftsampledata.png";
import aircraftsampledata2 from "../../../assets/images/marketplaceSoon/aircraftsampledata2.png";

const cardData = [
    {
        id: 1,
        name: 'Platoi',
        modalHeading: 'Advanced Water-Related Geohazards Predictor',
        modalButtons: ['Minerals', 'Real Estate', 'Transportation', 'Infrastructure and Utilities', 'Agriculture', 'Insurance and Financial Services', 'Machine Learning', 'Evironmental Protection', 'Land Use and Management', ],
        modalDescription: 'This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes. This processing block is developed and launched for providing the users with a convenient way to query for the water-related geohazards such as flooding, exposure to the water body, etc. for their interested areas. The users can use this Platoi processing block to query any place on the earth at any time for the predicted water-related geohazards. The machine learning model for this block has been recently optimised in October 2020.',
        modalImages: [platoisampledata, platoisampledata2, platoisampledata3, platoisampledata4],
        image: platoi,
        heading: "Advanced Geohazards Predictor",
        subHeading: "This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes.",
        speed: "1000 per km",
        public: "1.3.0 public",
        performance: {
            latency: '9',
            accuracy: '62',
            cpuUsage: '30',
            memoryUsageRel: '11',
            systemThroughput: '106',
        },
        deviceName:'NVIDIA Jetson Nano',
        deviceDescription: 'Jetson Nano is a small, powerful computer for embedded applications and AI IoT that delivers the power of modern AI in a $99 (1KU+) module. Get started fast with the comprehensive JetPack SDK with accelerated libraries for deep learning, computer vision, graphics, multimedia, and more.',
        restricted: ""
    },
    {
        id: 2,
        name: 'Picterra',
        modalHeading: 'Building Bounding Box Detector',
        modalButtons: ['Minerals', 'Real Estate', 'Transportation', 'Infrastructure and Utilities', 'Agriculture', 'Insurance and Financial Services', 'Machine Learning', 'Evironmental Protection', 'Land Use and Management', ],
        modalDescription: 'This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes. This processing block is developed and launched for providing the users with a convenient way to query for the water-related geohazards such as flooding, exposure to the water body, etc. for their interested areas. The users can use this Platoi processing block to query any place on the earth at any time for the predicted water-related geohazards. The machine learning model for this block has been recently optimised in October 2020.',
        modalImages: [picterrasampledata, picterrasampledata2, platoisampledata],
        image: picterrasm,
        heading: "Building Bounding Box",
        subHeading: "This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes.",
        speed: "100 per km",
        public: "2.0.0 public",
        performance: {
            latency: '9',
            accuracy: '62',
            cpuUsage: '30',
            memoryUsageRel: '11',
            systemThroughput: '106',
        },
        deviceName:'NVIDIA Jetson Nano',
        deviceDescription: 'Jetson Nano is a small, powerful computer for embedded applications and AI IoT that delivers the power of modern AI in a $99 (1KU+) module. Get started fast with the comprehensive JetPack SDK with accelerated libraries for deep learning, computer vision, graphics, multimedia, and more.',
        restricted: ""
    },
    {
        id: 3,
        name: 'Aventior',
        modalHeading: 'Building Detection',
        modalButtons: ['Object', 'Infrastructure and Utilities', 'Analytics', 'Insurance and Financial Services', 'Machine Learning', 'Evironmental Protection', 'Land Use and Management', ],
        modalDescription: 'This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes. This processing block is developed and launched for providing the users with a convenient way to query for the water-related geohazards such as flooding, exposure to the water body, etc. for their interested areas. The users can use this Platoi processing block to query any place on the earth at any time for the predicted water-related geohazards. The machine learning model for this block has been recently optimised in October 2020.',
        modalImages: [aircraftsampledata, aircraftsampledata2, platoisampledata, ],
        image: orbitalsm,
        heading: "Building Detection",
        subHeading: "This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes.",
        speed: "100 per km",
        public: "1.3 public",
        performance: {
            latency: '9',
            accuracy: '62',
            cpuUsage: '30',
            memoryUsageRel: '11',
            systemThroughput: '106',
        },
        deviceName:'NVIDIA Jetson Nano',
        deviceDescription: 'Jetson Nano is a small, powerful computer for embedded applications and AI IoT that delivers the power of modern AI in a $99 (1KU+) module. Get started fast with the comprehensive JetPack SDK with accelerated libraries for deep learning, computer vision, graphics, multimedia, and more.',
        restricted: ""
    },
    {
        id: 4,
        name: 'Picterra',
        modalHeading: 'Building Bounding Box Detector',
        modalButtons: ['Minerals', 'Real Estate', 'Transportation', 'Infrastructure and Utilities', 'Agriculture', 'Insurance and Financial Services', 'Machine Learning', 'Evironmental Protection', 'Land Use and Management', ],
        modalDescription: 'This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes. This processing block is developed and launched for providing the users with a convenient way to query for the water-related geohazards such as flooding, exposure to the water body, etc. for their interested areas. The users can use this Platoi processing block to query any place on the earth at any time for the predicted water-related geohazards. The machine learning model for this block has been recently optimised in October 2020.',
        modalImages: [picterrasampledata, picterrasampledata2, platoisampledata],
        image: picterrasm,
        heading: "Building Bounding Box",
        subHeading: "This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes.",
        speed: "100 per km",
        public: "2.0.0 public",
        performance: {
            latency: '9',
            accuracy: '62',
            cpuUsage: '30',
            memoryUsageRel: '11',
            systemThroughput: '106',
        },
        deviceName:'NVIDIA Jetson Nano',
        deviceDescription: 'Jetson Nano is a small, powerful computer for embedded applications and AI IoT that delivers the power of modern AI in a $99 (1KU+) module. Get started fast with the comprehensive JetPack SDK with accelerated libraries for deep learning, computer vision, graphics, multimedia, and more.',
        restricted: ""
    },
    {
        id: 5,
        name: 'Aventior',
        modalHeading: 'Building Detection',
        modalButtons: ['Minerals', 'Real Estate', 'Transportation', 'Infrastructure and Utilities', 'Agriculture', 'Insurance and Financial Services', 'Machine Learning', 'Evironmental Protection', 'Land Use and Management', ],
        modalDescription: 'This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes. This processing block is developed and launched for providing the users with a convenient way to query for the water-related geohazards such as flooding, exposure to the water body, etc. for their interested areas. The users can use this Platoi processing block to query any place on the earth at any time for the predicted water-related geohazards. The machine learning model for this block has been recently optimised in October 2020.',
        modalImages: [aircraftsampledata, aircraftsampledata2, platoisampledata, ],
        image: orbitalsm,
        heading: "Building Detection",
        subHeading: "This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes.",
        speed: "100 per km",
        public: "1.0 public",
        performance: {
            latency: '9',
            accuracy: '62',
            cpuUsage: '30',
            memoryUsageRel: '11',
            systemThroughput: '106',
        },
        deviceName:'NVIDIA Jetson Nano',
        deviceDescription: 'Jetson Nano is a small, powerful computer for embedded applications and AI IoT that delivers the power of modern AI in a $99 (1KU+) module. Get started fast with the comprehensive JetPack SDK with accelerated libraries for deep learning, computer vision, graphics, multimedia, and more.',
        restricted: "Restricted Block"
    },
    {
        id: 6,
        name: 'Picterra',
        modalHeading: 'Building Bounding Box Detector',
        modalButtons: ['Minerals', 'Real Estate', 'Transportation', 'Infrastructure and Utilities', 'Agriculture', 'Insurance and Financial Services', 'Machine Learning', 'Evironmental Protection', 'Land Use and Management', ],
        modalDescription: 'This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes. This processing block is developed and launched for providing the users with a convenient way to query for the water-related geohazards such as flooding, exposure to the water body, etc. for their interested areas. The users can use this Platoi processing block to query any place on the earth at any time for the predicted water-related geohazards. The machine learning model for this block has been recently optimised in October 2020.',
        modalImages: [picterrasampledata, picterrasampledata2, platoisampledata],
        image: picterrasm,
        heading: "Building Bounding Box",
        subHeading: "This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes.",
        speed: "100 per km",
        public: "2.0.0 public",
        performance: {
            latency: '9',
            accuracy: '62',
            cpuUsage: '30',
            memoryUsageRel: '11',
            systemThroughput: '106',
        },
        deviceName:'NVIDIA Jetson Nano',
        deviceDescription: 'Jetson Nano is a small, powerful computer for embedded applications and AI IoT that delivers the power of modern AI in a $99 (1KU+) module. Get started fast with the comprehensive JetPack SDK with accelerated libraries for deep learning, computer vision, graphics, multimedia, and more.',
        restricted: ""
    },
    {
        id: 7,
        name: 'Aventior',
        modalHeading: 'Building Detection',
        modalButtons: ['Minerals', 'Real Estate', 'Transportation', 'Infrastructure and Utilities', 'Agriculture', 'Insurance and Financial Services', 'Machine Learning', 'Evironmental Protection', 'Land Use and Management', ],
        modalDescription: 'This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes. This processing block is developed and launched for providing the users with a convenient way to query for the water-related geohazards such as flooding, exposure to the water body, etc. for their interested areas. The users can use this Platoi processing block to query any place on the earth at any time for the predicted water-related geohazards. The machine learning model for this block has been recently optimised in October 2020.',
        modalImages:  [aircraftsampledata, aircraftsampledata2, platoisampledata, ],
        image: orbitalsm,
        heading: "Building Detection",
        subHeading: "This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes.",
        speed: "100 per km",
        public: "1.0 public",
        performance: {
            latency: '9',
            accuracy: '62',
            cpuUsage: '30',
            memoryUsageRel: '11',
            systemThroughput: '106',
        },
        deviceName:'NVIDIA Jetson Nano',
        deviceDescription: 'Jetson Nano is a small, powerful computer for embedded applications and AI IoT that delivers the power of modern AI in a $99 (1KU+) module. Get started fast with the comprehensive JetPack SDK with accelerated libraries for deep learning, computer vision, graphics, multimedia, and more.',
        restricted: "Restricted Block"
    },
    
];
    
export {cardData}