import { User } from '../../entities/user';
import { Voice } from "../../entities/voice";
import { AppDataSource } from '../../ormconfig';
import { Stories } from "../../entities/stories";
import { UserStory } from "../../entities/userStory";

export const DashboardData = async (useriD: string) => {

    const userStoriesRepository = AppDataSource.getRepository(UserStory);
    const storiesRepository = AppDataSource.getRepository(Stories);
    const voiceRepository = AppDataSource.getRepository(Voice);
    const userRepository = AppDataSource.getRepository(User);

    try {

        const users = await userRepository.find();
        const voices = await voiceRepository.find();
        const stories = await storiesRepository.find();
        const usersStories = await userStoriesRepository.find();

        console.log("user:", users, "voices:", voices, "stories:", stories, "usersStories:", usersStories);

        return {users, stories, voices, usersStories};
    } catch(error) {
        console.error("Error get Admin data:", error);
    }

}