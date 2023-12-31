import { S3DeleteError } from './../middlewares/error/constant/S3deleteError';
import { VocalAndCommentDoesNotMatch } from './../middlewares/error/constant/VocalAndCommentDoesNotMatch';
import { ResultNotFound } from './../middlewares/error/constant/resultNotFound';
import { PrismaClient } from "@prisma/client";
import { getAudioDurationInSeconds } from 'get-audio-duration';
import { BeatCreateDTO, BeatClickedDTO, AllBeatDTO, CommentCreateDTO, AllCommentDTO, DeleteBeatDTO } from '../interfaces/tracks';
import { rm } from '../constants';
import { InvalidBeatIdError, ProducerAndBeatDoesNotMatch } from '../middlewares/error/constant';
import DeletCommentDTO from '../interfaces/tracks/DeleteCommentDTO';
import multipartS3 from '../config/s3MultipartConfig';
import config from '../config';

const prisma = new PrismaClient();

const createBeat = async(beatDTO: BeatCreateDTO, jacketLocation: string, wavLocation: string) => {
    try {

        const data = await prisma.beat.create({
            data: {
                title: beatDTO.title,
                category: beatDTO.category,
                beatFile: wavLocation,
                beatImage: jacketLocation,
                introduce: beatDTO.introduce,
                keyword: beatDTO.keyword,
                producerId: beatDTO.userId,
                isClosed: false,
                BeatFileDuration: {
                    create: {
                        duration: await getAudioDurationInSeconds(wavLocation)
                    }
                }
            },
        });

        if ( !data ) throw new ResultNotFound(rm.BEAT_UPLOAD_FAIL);
        return data;
    } catch (error) {
        throw error;
    }
};

const getBeatLocation = async(beatId: number) => {
    try {

        const data = await prisma.beat.findUnique({
            where: {
                id: beatId,
            },
            select: {
                id: true,
                beatFile: true,
            },
        });

        if ( !data ) throw new ResultNotFound(rm.INVALID_FILE_ID);
        return data;
    } catch (error) {
        throw error;
    }
};

const getAllBeat = async(page: number, limit: number) => {
    try {

        const allBeatData = await prisma.beat.findMany({
            select: {
                id: true,
                beatImage: true,
                beatFile: true,
                title: true,
                keyword: true,
                category: true,
                producerId: true,
                BeatFileDuration: {
                    select: {
                        duration: true
                    }

                },
                Producer: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip: (page-1)*limit,
            take: limit,
        });
        
        
        const allBeats = await Promise.all(allBeatData.map(async (item, i) => {
            
            const beatReturn: AllBeatDTO = {
                beatId: item.id,
                jacketImage: item.beatImage,
                wavFile: item.beatFile,
                title: item.title,
                producerId: item.Producer.id,
                producerName: item.Producer.name,
                keyword: item.keyword,
                category: item.category[0],
                wavFileLength: item.BeatFileDuration?.duration as number
            };
            
            return beatReturn;
        }));

        if ( !allBeats ) throw new ResultNotFound(rm.INVALID_BEAT_ID);
        return allBeats;
    } catch (error) {
        throw error;
    }
}

const getAllComment = async(beatId: number, userId: number, tableName: string, page: number, limit: number) => {
    try {
        //beatid에 해당하는 코멘트들 싹 가져오기
        //(코멘트고유id/보컬id/코멘트id/댓글wav파일/내용/재생길이
        const beatData = await prisma.beat.findUnique({
            where: {
                id: beatId
            },
        });

        if ( !beatData ) throw new InvalidBeatIdError(rm.INVALID_BEAT_ID);
        const allCommentData = await prisma.comment.findMany({
            where:{
                beatId: beatId,
            },
            select:{
                id: true,
                beatId: true,
                vocalId: true,
                commentFile: true,
                content: true,
                CommentFileDuration: {
                    select: {
                        duration: true
                    }
                },
                Vocal: {    //! 요기서 바로가져오기 가능
                    select: {
                        name: true,
                        vocalImage: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip: (page-1)*limit,
            take: limit,
        });

        const allComments = await Promise.all(allCommentData.map(async (item, i) => {
            //const crd = commentVocalData[i] as any;
            const isMe = (userId == item.vocalId) ? true: false;
            
            const commentReturn: AllCommentDTO = {
                commentId : item.id,
                vocalWavFile : item.commentFile,
                vocalName : item.Vocal.name,
                vocalProfileImage : item.Vocal.vocalImage,  //! 요렇게 사용
                comment : item.content || '',
                isMe : isMe,
                vocalWavFileLength : item.CommentFileDuration?.duration as number
            };
            
            return commentReturn;
        }));

        if ( !allComments ) throw new ResultNotFound(rm.INVALID_BEAT_ID);
        return allComments;
    } catch (error) {
        throw error;
    }
}

const updateBeatClosed = async(beatId: number) => {
    try {
        const isClosedBeat = await prisma.beat.findUnique({
            where: {
                id: beatId,
            },
            select: {
                isClosed: true,
            }
        });

        const changeIsClosed = (isClosedBeat?.isClosed) ? false: true;
        const data = await prisma.beat.update({
            where: {
                id: beatId,
            },
            data: {
                isClosed: changeIsClosed,
            },
        });
        
        if ( !data ) throw new ResultNotFound(rm.BEAT_CLOSED_FAIL);
        return data;
    } catch (error) {
        throw error;
    }
};

const updateBeatInfo = async(beatId: number, userId: number) => {
    try {
        const updateObj = await prisma.beat.findUnique({
            where: {
                producerBeat: {
                    id: beatId,
                    producerId: userId,
                },
            }
        });

        if (!updateObj) throw new ProducerAndBeatDoesNotMatch(rm.NOT_PRODUCER_BEAT);
/*
        await prisma.beat.update({
            data: {

            }
        })
*/
    } catch (error) {
        throw error;
    }
};
    
const getClickedBeat = async(beatId: number, userId: number, tableName: string) => {
    try {
        const beatData = await prisma.beat.findUnique({
            where: { id: beatId }
        });

        if (!beatData) throw new InvalidBeatIdError(rm.INVALID_BEAT_ID);

        const producerData = await prisma.producer.findUnique({
            where: { id: beatData.producerId },
            select: {
                name: true,
                producerImage: true,
                producerID: true,
                id: true,
            }
        });
        
        if (!producerData) throw new InvalidBeatIdError(rm.INVALID_BEAT_ID);

        const isMe = (userId === producerData?.id) ? true: false;
        const wavefileLength = await getAudioDurationInSeconds(beatData.beatFile);
        
        const getClickBeatReturn: BeatClickedDTO = {

            beatId: beatData.id,
            jacketImage: beatData.beatImage,
            beatWavFile: beatData.beatFile,
            title: beatData.title,
            producerId: producerData.id,
            producerName: producerData.name,
            producerProfileImage: producerData.producerImage,
            introduce: beatData.introduce || '',
            keyword: beatData.keyword,
            category: beatData.category[0],
            isMe: isMe as boolean,
            wavFileLength: wavefileLength,
            isClosed: beatData.isClosed,
        };

        if ( !getClickBeatReturn ) throw new ResultNotFound(rm.GET_CLICKED_BEAT_FAIL);
        return getClickBeatReturn;
    } catch (error) {
        throw error;
    }
}

const postBeatComment = async(beatId: number, commentDTO: CommentCreateDTO, wavLocation: string)=> {
    try {
        const data = await prisma.comment.create({
            data: {
                beatId: beatId,
                vocalId: commentDTO.userId,
                commentFile: wavLocation,
                content:commentDTO.content,
                CommentFileDuration: {
                    create: {
                        duration: await getAudioDurationInSeconds(wavLocation)
                    }
                }
            },
        });

        const createVocalOrder = await prisma.vocalOrder.create({
            data: {
                vocalId: commentDTO.userId,
                orderStandardTableName: 'comment',
                orderStandardTableId: data.id,
            }
        });

        if ( !data ) throw new ResultNotFound(rm.COMMENT_UPLOAD_FAIL);
        return data;
    } catch (error) {
        throw error;
    }
};   

const getFilteredTracks = async(categList: string[], page: number, limit: number) => {
    try {
        //! 작업물 최신순 정렬
        const trackList = await prisma.beat.findMany({
            select:{
                id: true,
                beatImage: true,
                beatFile: true,
                title: true,
                Producer: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                keyword: true,
                category: true,
                BeatFileDuration: {
                    select: {
                        duration: true
                    }
                },
            },
            where: {
                AND: 
                    [
                        {category : { hasSome: categList }},
                        {isClosed: false}
                    ],
            },
            orderBy: {
                createdAt: 'desc',
            },
            distinct: ['id'],
            skip: (page-1)*limit,
            take: limit,
        });   


        const result = await Promise.all(trackList.map((track) => {

            const returnDTO:AllBeatDTO = {
                beatId: track.id,
                jacketImage: track.beatImage,
                wavFile: track.beatFile,
                title: track.title,
                producerId: track.Producer.id,
                producerName: track.Producer.name,
                keyword: track.keyword,
                category: track.category[0],
                wavFileLength: track.BeatFileDuration?.duration as number,
            }
            return returnDTO;
        }));

        if ( !result ) throw new ResultNotFound(rm.GET_FILTERING_FAIL);
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteBeatWithId = async(beatId: number, userId: number, tableName: string) => {
    try {
        const deletObj = await prisma.beat.findUnique({
            where: {
                producerBeat: {
                    id: beatId,
                    producerId: userId,
                },
            },
        });
        if (!deletObj) throw new ProducerAndBeatDoesNotMatch(rm.NOT_PRODUCER_BEAT);


        //! s3 delete object
        const keyList = (deletObj.beatImage !== config.defaultJacketAndProducerPortfolioImage) 
                            ? [deletObj.beatFile, deletObj.beatImage] : [deletObj.beatFile];  //* 기본 재킷이미ㅣ 삭제하지 않기 위해 
        const objects = keyList.map(key => ({ Key: key }));

        await multipartS3.deleteObjects({
            Bucket: config.bothWavImageBucketName,
            Delete: { Objects: objects }
        }, function(err) {
            if (err) { throw new S3DeleteError(rm.FAIL_DELETE_S3_OBJECT);}
        }).promise();


        await prisma.beat.delete({
            where: {
                producerBeat: {
                    id: beatId,
                    producerId: userId,
                },
            },
        });

        const result: DeleteBeatDTO = {
            producerId: userId,
        };
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteCommentWithId = async(commentId: number, userId: number, tableName: string) => {
    try {
        let deleteObj = await prisma.comment.findUnique({
            where: {
                vocalComment: {
                    vocalId: userId,
                    id: commentId,
                },
            },
            select: {
                beatId: true,
                commentFile: true,
            }
        });

        if (!deleteObj) throw new VocalAndCommentDoesNotMatch(rm.NOT_VOCAL_COMMENT);
        const a = 'https://track1-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A9%E1%86%B7%E1%84%87%E1%85%A9%E1%86%B7_blue.mp3';
        //let fileName = deleteObj.commentFile.split(config.wavBucketName+'.s3.ap-northeast-2.amazonaws.com/')[1];
        let fileName = a.split(config.wavBucketName+'.s3.ap-northeast-2.amazonaws.com/')[1];
        console.log(fileName);
        const s3obj = await multipartS3.getObject({
            Bucket: config.wavBucketName,
            Key: fileName as string,
        }, function(err) {
            if (err) { throw new S3DeleteError(rm.FAIL_DELETE_S3_OBJECT);}
        }).promise();
        console.log(s3obj.ContentType);

        /*
        //! s3 delete object
        await multipartS3.deleteObject({
            Bucket: config.wavBucketName,
            Key: fileName as string,
        }, function(err) {
            if (err) { throw new S3DeleteError(rm.FAIL_DELETE_S3_OBJECT);}
        }).promise();

*/

 

/*
        await prisma.comment.delete({
            where: {
                vocalComment: {
                    vocalId: userId,
                    id: commentId,
                },
            },
        }); 
*/
        const result: DeletCommentDTO = {
            vocalId: userId,
            beatId: deleteObj.beatId,
        };

        return result;
    } catch (error) {
        throw error;
    }

};

const tracksService = {
    createBeat,
    getBeatLocation,
    getAllBeat,
    updateBeatClosed,
    updateBeatInfo,
    getClickedBeat,
    postBeatComment,
    getAllComment,
    getFilteredTracks,
    deleteBeatWithId,
    deleteCommentWithId,
};

export default tracksService;