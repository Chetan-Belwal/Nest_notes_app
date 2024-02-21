import { NoteModel } from "../models/note.model";
import { SharedNotesModel } from "../models/shared.notes.model";
import { UserModel } from "../models/user.model";


export const DefaultConnectionModels = [
    UserModel,
    NoteModel,
    SharedNotesModel
];
