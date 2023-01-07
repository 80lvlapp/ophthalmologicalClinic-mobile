import ophthalmologistExamination from './ophthalmologistExamination';
const templates = {
    ophthalmologistExamination
}
export const getTemplate = (Template) => {
    return templates[Template];
}
