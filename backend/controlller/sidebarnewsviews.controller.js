import SidebarNews from '../model/sidebarnews.model.js';

export const incrementSidebarNewsViews = async (sidebarnewsId) => {
    try {
        const sidebarNews = await SidebarNews.findById(sidebarnewsId);

        if (!sidebarNews) {
            throw new Error('Sidebar news not found');
        }

        sidebarNews.views++; // veya isteğinize uygun artırma işlemi
        await sidebarNews.save();

        return sidebarNews.views;
    } catch (error) {
        throw new Error(error.message);
    }
};
