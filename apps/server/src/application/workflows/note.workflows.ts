import { NoteEntity, type NoteRepository, type NoteType } from "@domain/note";

export class NoteWorkflows {
  constructor(private readonly noteRepository: NoteRepository) {}

  async createNote(text: NoteType["text"]) {
    const note = NoteEntity.create({ text });
    const result = await this.noteRepository.create(note);
    return result;
  }

  async getNoteById(id: NoteType["id"]) {
    const note = await this.noteRepository.findById(id);
    return note;
  }
}
