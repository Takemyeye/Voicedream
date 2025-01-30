import { Request, Response } from 'express';
import { AppDataSource } from '../ormconfig';
import { Stories } from '../entities/stories';

export const TTSController = async ( storyId: string, userId: string) => {

  if (!storyId || !userId) {
    return null;
  }

  try {
    const storyRepository = AppDataSource.getRepository(Stories);
    const story = await storyRepository.findOne({ where: { userId, storyId } });

    if (!userId) {
        console.log('user ID: sbagliato')
        return null;
    }

    if (!story) {
        console.log('eeajnjsovnasdsb')
      return null;
    }

    return story.story;
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
};
