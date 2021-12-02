import joi from 'joi';

export default function validateNewMusic(object) {
  // prettier-ignore
  const youtubeLink = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  const musicSchema = joi.object({
    name: joi.string().min(3).max(100).required(),
    youtubeLink: joi.string().pattern(new RegExp(youtubeLink)),
  });
  const { error } = musicSchema.validate(object);
  return !joi.isError(error);
}
