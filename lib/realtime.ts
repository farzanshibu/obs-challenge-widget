import { supabase } from '@/lib/supabase';
import { useChallengeStore } from '@/store/fetchstore';
import { useEffect } from 'react';

interface Challenge {
    id: number;
    title: string;
    maxValue: number;
    currentValue: number;
    endDate: Date | null;
    is_active: boolean;
    created_at: string;
}

const useChallengeSubscription = () => {
    const setChallenge = useChallengeStore((state) => state.setChallenge);

    useEffect(() => {
        const channel = supabase
            .channel('public:challenge')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'challenge' }, (payload) => {
                console.log('Change received!', payload);
                const newChallenge: Challenge = payload.new;
                setChallenge(newChallenge);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [setChallenge]);
};

export default useChallengeSubscription;
