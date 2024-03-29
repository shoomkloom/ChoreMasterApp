import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ChoreListFilters } from '../pipes/chore-list-filter';

@Injectable({
    providedIn: 'root'
})
export class Helpers{
    colors = ['#27AE60', '#F39C12', '#7D3C98', '#1A5276', '#D35400'];

    getColor(i: number){
        let colorIndex = i;
        while(colorIndex > this.colors.length-1){
          colorIndex-=this.colors.length;
        }
    
        return this.colors[colorIndex];
    }

    setCurrentUser(userJSON: string){
        localStorage.setItem('currentUser', userJSON);
    }

    clearCurrentUser(){
        localStorage.setItem('currentUser', JSON.stringify({id: -1}));
    }

    getCurrentUser() : User{
        return (JSON.parse(localStorage.getItem('currentUser')) as User);
    }

    setToken(token: string){
        localStorage.setItem('token', token);
    }

    getToken(){
        return localStorage.getItem('token');
    }

    clearToken(){
        localStorage.setItem('token', '-1');
    }

    setChoreListAccordionActiveIds(activeIds: string){
        localStorage.setItem('activeIds', activeIds);
    }

    getChoreListAccordionActiveIds(): string{
        return localStorage.getItem('activeIds');
    }

    setChoreListFilters(choreListFilters: ChoreListFilters){
        localStorage.setItem('choreListFilters', JSON.stringify(choreListFilters));
    }

    getChoreListFilters(): ChoreListFilters{
        return (JSON.parse(localStorage.getItem('choreListFilters')) as ChoreListFilters);
    }
}