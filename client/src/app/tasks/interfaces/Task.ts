export type Task =  {
    title : string ,
    description : string,
    done : boolean,
    is_favorite : boolean,
    id : string
}
export type TaskForm = Pick<Task, 'description' | 'title' | 'id'>