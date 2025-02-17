import { Stories } from '../entities/stories';
import { AppDataSource } from '../ormconfig';

export const saveStory = async (reply: string, userId: string, title: string, min: number, argument?: string, place?: string, numberCharacters?: number, nameCharacters?: string) => {
  const storyRepository = AppDataSource.getRepository(Stories);

  const newStory = new Stories();
    newStory.story = reply;
    newStory.userId = userId;
    newStory.title = title;
    newStory.place = place;
    newStory.min = min;
    newStory.argument = argument;
    newStory.names = nameCharacters
    newStory.count = numberCharacters;

  await storyRepository.save(newStory);

  return newStory;
};
