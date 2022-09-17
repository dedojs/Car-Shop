interface IService<T> {
  create(obj:unknown):Promise<T>,
  readOne(_id:string):Promise<T>,
  read():Promise<T[]>,
  delete(_id:string):Promise<T>,
  update(_id:string, obj: T):Promise<T | null>
}

export default IService;