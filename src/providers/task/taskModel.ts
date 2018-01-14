export class TASKMODEL {
  constructor(
    public id: number,
    public task: string,
    public priority: string,
    public status: string,
    public isdone : boolean
    //public isdone: boolean
  ) {}
}
