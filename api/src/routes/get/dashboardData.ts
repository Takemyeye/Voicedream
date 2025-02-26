import { User } from '../../entities/user';
import { Voice } from "../../entities/voice";
import { AppDataSource } from '../../ormconfig';
import { Stories } from "../../entities/stories";
import { UserStory } from "../../entities/userStory";

export const DashboardData = async (userId: string) => {

    const userStoriesRepository = AppDataSource.getRepository(UserStory);
    const storiesRepository = AppDataSource.getRepository(Stories);
    const voiceRepository = AppDataSource.getRepository(Voice);
    const userRepository = AppDataSource.getRepository(User);

    try {
        const [users, voices, stories, usersStories] = await Promise.all([
            userRepository.find(),
            voiceRepository.find(),
            storiesRepository.find(),
            userStoriesRepository.find()
        ]);

        return { users, stories, voices, usersStories };
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
};
