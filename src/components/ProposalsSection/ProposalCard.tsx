import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import bemCreator from '../bemCreator';
import { Proposal } from '../../redux/proposal/types';
import { useNavigate } from 'react-router-dom';

const cn = bemCreator('proposals-section');

interface Props {
    proposal: Proposal;
    className?: string;
    showDescription?: boolean;
}

const ProposalCard = ({ proposal, className, showDescription }: Props) => {
    const navigate = useNavigate();
    return (
        <Card className={`${cn('card')} ${className}`} onClick={() => navigate(`/cards/${proposal.id}`)}>
            <div className={cn('row')}>
                <img src={proposal.userProfile?.imageUrl} alt="" />
                <div className={cn('text')}>
                    <h3 className={cn('card-title')}>{proposal.title}</h3>

                    <p className={cn('status')}>{proposal.status}</p>
                </div>
            </div>
            {showDescription && (
                <div>
                    <p className={cn('description')}>{proposal.description?.substring(0, 290) + '...'}</p>
                </div>
            )}

            <Stack direction="row" justifyContent="flex-start" flexWrap="wrap" spacing={2} className={cn('skills')}>
                {proposal?.userProfile?.skills?.map((skill, index) => (
                    <Chip key={index} label={skill} size="small" className={cn('skill')} />
                ))}
            </Stack>
            <CardActions className={cn('button-contaner')}>
                <div className={cn('text')}>
                    <span className={cn('text')}>{proposal.userProfile?.ratePerHour} ₽ / час</span>
                </div>
                <span className={cn('rating')}>Рейтинг: {proposal.userProfile?.rating}%</span>
            </CardActions>
        </Card>
    );
};

export default ProposalCard;
