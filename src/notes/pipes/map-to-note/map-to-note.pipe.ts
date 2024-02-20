import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { NoteModel } from '../../../database/models/note.model';
import { NotesService } from '../../services/notes.service';

@Injectable()
export class MapToNotePipe implements PipeTransform {
  constructor(private noteRepo: NotesService) {}
  async transform(id: number, metadata: ArgumentMetadata): Promise<NoteModel> {
    console.log(metadata, 'meta');
    const note = await this.noteRepo.findOne(id);
    if (!note) {
      throw new NotFoundException();
    }
    return note;
  }
}
