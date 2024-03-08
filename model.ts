export interface TripPostMovieRespone {
    mid:    number;
    name:   string;
    type:   string;
    detail: string;
    year:   string;
    id:     string;
    poster: string;
}
export interface TripPostPersonRespone {
    pid:    number;
    name:   string;
    detail: string;
    lmage:  string;
}
export interface TripPostStarRespone {
    SMID: number;
    SPID: number;
}
export interface TripPostCreatorRespone {
    CMID: number;
    CPID: number;
}