import moment from 'moment';
export const getEpisodenumber = (num) => {
    return num?.toString().length === 1 ? `0${num}` : num;
}

export const getEpisodeDate = (val) => {
    const date = val.split('-')
    return moment([date[0],date[1],date[2]]).format('MMM D,YYYY')
}