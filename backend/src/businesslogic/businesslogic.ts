// import { AttachmentUtils } from './filemanagement';
// import { TodoItem } from '../models/TodoItem'
// import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
// import * as uuid from 'uuid'
// import * as createError from 'http-errors'
import { createTodo, getTodos, deleteTodo, updateTodo, generateUrl } from '../datalayer/datalayer'
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
import { deleteBucket } from '../filemanagement/filemanagement';

// TODO: Implement businessLogic

export function getTodosForUser(userId:string) {
    return new Promise(async(resolve, reject) => {
        try {
            const todos = await getTodos(userId);
            resolve(todos)
        } catch (error) {
            reject(error)
        }
    })
}

export function createUserTodo(newTodo: CreateTodoRequest, userId: string): Promise <{}> {
	return new Promise(async (resolve, reject) => {
		try {
            const todo = await createTodo(newTodo, userId);
            resolve(todo)
          } catch (error) {
            reject(error)
          }
	});
}

export function deleteUserTodo(todoId: string, userId: string):Promise <{}> {
	return new Promise(async (resolve, reject) => {
		try {
            const todo = await deleteTodo(todoId, userId);
            deleteBucket(todoId);
            resolve(todo)
          } catch (error) {
            reject(error)
          }
	});
}

export function updateUserTodo(updatedTodo: UpdateTodoRequest, todoId: string, userId: string):Promise <{}> {
	return new Promise(async (resolve, reject) => {
		try {
            const todo = await updateTodo(updatedTodo, todoId, userId);
            resolve(todo)
          } catch (error) {
            reject(error)
          }
});
}

export function createAttachmentPresignedUrl(todoId: string, userId: string):Promise <{}> {
	return new Promise(async (resolve, reject) => {
		try {
            const todo = await generateUrl(todoId, userId);
            resolve(todo)
          } catch (error) {
            reject(error)
          }
	});
}

