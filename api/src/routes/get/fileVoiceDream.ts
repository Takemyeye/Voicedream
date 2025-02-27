import { UserStory } from "../../entities/userStory" 
import { AppDataSource } from "../../ormconfig"

export const fileVoiceDream = async (userId: string) => {

    const userStoryRepository = AppDataSource.getRepository(UserStory);

    try {

        const userStory = await userStoryRepository.find({ where: { userId } })

        return userStory;
    } catch(error) {
        console.error('Error get User Story:', error);
        return null;
    }
    
}