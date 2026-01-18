import { supabase } from '../utils/supabaseClient';

export const fetchComments = async () => {
    try {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('is_approved', true)
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) {
            console.error('Error fetching comments:', error);
            return [];
        }
        return data;
    } catch (err) {
        console.error('Unexpected error fetching comments:', err);
        return [];
    }
};

export const postComment = async (content, username) => {
    try {
        const finalUsername = username && username.trim() !== '' ? username : 'Anonymous Vibe';

        // Optimistic check for empty content
        if (!content || content.trim() === '') return null;

        const { data, error } = await supabase
            .from('comments')
            .insert([
                { content, username: finalUsername }
            ])
            .select();

        if (error) {
            console.error('Error posting comment:', error);
            return null;
        }
        return data ? data[0] : null;
    } catch (err) {
        console.error('Unexpected error posting comment:', err);
        return null;
    }

};

export const likeComment = async (commentId) => {
    try {
        const { error } = await supabase.rpc('increment_likes', { row_id: commentId });
        if (error) {
            console.error('Error liking comment:', error);
            return false;
        }
        return true;
    } catch (err) {
        console.error('Unexpected error liking comment:', err);
        return false;
    }
};
