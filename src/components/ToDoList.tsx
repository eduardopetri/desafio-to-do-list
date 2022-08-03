import styles from './ToDoList.module.css';
import formIcon from '../assets/form-icon.svg';

import { Trash } from 'phosphor-react';

interface ToDo {
    id: string;
    description: string;
    isCompleted: boolean;
}

interface ToDoListProps {
    toDoListData: ToDo[];
    onRemoveToDo: (toDoId: string) => void;
    onToggleToDoIsCompleted: (toDoId: string) => void;
}

export function ToDoList({ toDoListData, onRemoveToDo, onToggleToDoIsCompleted }: ToDoListProps) {

    const hasAnyToDo = toDoListData.length > 0;
    const numberOfCreatedTasks = toDoListData.length;
    const numberOfDoneTasks = toDoListData.reduce((accumulator, currentToDo) => {
        if (currentToDo.isCompleted) {
            return accumulator += 1;
        }
        return accumulator;
    }, 0);


    function handleRemoveTodo(toDoId: string) {
        onRemoveToDo(toDoId);
    }

    function handleToggleIsCompleted(toDoId: string) {
        onToggleToDoIsCompleted(toDoId);
    }

    return (
        <div className={styles.toDoListWrapper}>
            <header className={styles.toDoListHeader}>
                <strong>Tarefas criadas <span>{numberOfCreatedTasks}</span></strong>
                <strong>Concluídas <span>{numberOfCreatedTasks > 0 ? `${numberOfDoneTasks} de ${numberOfCreatedTasks}` : 0}</span></strong>
            </header>

            {!hasAnyToDo &&
                <div className={styles.toDoListEmptyContainer}>
                    <img src={formIcon} alt="Icone de formulário" />

                    <p>Você ainda não tem tarefas cadastradas </p>
                    <p>Crie tarefas e organize seus itens a fazer</p>

                </div>
            }

            <div className={styles.toDoListContainer}>
                {toDoListData.map(toDo => {
                    return (
                        <div key={toDo.id} className={styles.toDoWrapper}>
                            <label className={styles.toDoCheckBox}>
                                <input
                                    type="checkbox"
                                    readOnly
                                    checked={toDo.isCompleted}
                                    onClick={() => handleToggleIsCompleted(toDo.id)}
                                />
                            </label>

                            <p className={toDo.isCompleted ? `${styles.toDoCompletedDescription}` : ''} >{toDo.description}</p>

                            <button onClick={() => handleRemoveTodo(toDo.id)} title="Deletar ToDo"><Trash /></button>
                        </div>
                    )
                })}
            </div>

        </div>
    );
}