export class Identity {
    global_name;
    preferred_social="none";
    social_url;

    constructor(data) {
        return Object.keys(data).filter(k1 => Object.keys(this).indexOf(k1) > -1).reduce(
            (prev,cur) => 
            ({...prev,[cur]:data[cur]}), {}
        );
    }
}