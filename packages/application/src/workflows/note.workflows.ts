import { NoteEntity } from "@domain/note/note.entity";
import { NoteRepository } from "@domain/note/note.repo";
import { type NoteType } from "@domain/note/note.schema";
import { autoInjectable } from "tsyringe";

@autoInjectable()
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
