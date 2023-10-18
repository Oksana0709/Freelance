import { User } from '../user/types';
import { UserProfile } from '../userProfile/types';

export interface ProjectDto {
    id: number;
    employerId: User['id'];
    title: string;
    description: string;
    budget: number;
    status: PROJECT_STATUS;
}

export enum PROJECT_STATUS {
    ACTIVE = 'active',
    ARCHIVED = 'archived',
}

export interface Project extends ProjectDto {
    canTakeProject: boolean;
    user?: User;
    userProfile?: UserProfile;
}

export interface PProject extends Omit<ProjectDto, 'id'> {}

export interface ProjectState {
    projects: Project[];
}
