export default interface AllBeatDTO {
    beatId: number;
    jacketImage: string;
    wavFile: string;
    title: string;
    producerName: string;
    keyword: string[];
    category: string[];
<<<<<<< HEAD
    wavFileLength: number;
=======
    wavFileLength: Promise<number>;
>>>>>>> b667eab67d08736dc22b117b013240f562f72872
};