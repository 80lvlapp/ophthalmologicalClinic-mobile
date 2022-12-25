import {THEME} from  './../themes'

const tableRowsDataPatientGlasses = [
    [
        { type: '', colspan: 0.4},
        { text: 'sph',  type: 'text', colspan: 1, padding: 0, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'cyl',  type: 'text', colspan: 1, padding: 0, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'axº',  type: 'text', colspan: 1, padding: 0, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'vls',  type: 'text', colspan: 1, padding: 0, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' }

    ],
    [
        { value: "д/дал PD= мм", Field: '', type: 'text', colspan: 1, padding: 1, fontWeight: 'bold', color: THEME.GREY_COLOR, textAlignVertical: 'center', textAlign: 'left' }
    ],
    [
        {text: "OD", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        {Field: '_1', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        {Field: '_2', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        {Field: '_3', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        {Field: '_4', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' }
    ],
    [
        { text: "OS", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        {Field: '_5', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        {Field: '_6', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        {Field: '_7', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        {Field: '_8', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' }
    ],
    [
        { text: "д/бл PD=мм", type: 'text', colspan: 1, padding: 1, fontWeight: 'bold', color: THEME.GREY_COLOR, textAlignVertical: 'center', textAlign: 'left' }
    ],
    [
        { text: "OD", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        {Field: '_9', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        {Field: '_10', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        {Field: '_11', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        {Field: '_12', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' }
    ],

    [
        { text: "OS", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        {Field: '_13', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        {Field: '_14', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        {Field: '_15', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        {type: '', colspan: 1,  padding: 4}
    ],

    [
        { text: "pall ADD", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_16', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_17', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_18', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_19', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' }
    ],
];

const tableRowsDataKeratometry = [
    [
        { text: 'OD', type: 'text', colspan: 4, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'OS', type: 'text', colspan: 4, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' }
    ],
    [
        { text: "K1", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_20', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: "AX1", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_21', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: "K1", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_22', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: "AX1", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_23', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' }
    ],
    [
        { text: "K2", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_24', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: "AX2", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_25', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: "K2", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_26', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: "AX2", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        {Field: '_26', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' }
    ],
    [
        { text: "AVE", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_27', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { type: '', colspan: 0.3, padding: 2},
        { type: '', colspan: 1, padding: 4},
        { text: "AVE", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_28', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { type: '', colspan: 0.3, padding: 2},
        { type: '', colspan: 1, padding: 4}
    ],

];

const tableRowsDataEyeResearch = [
    [
        { type: '', colspan: 0.3},
        { text: 'Пневмотонометрия и тонометрия по Маклакову', Field: '', type: 'text', colspan: 2, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'Оптическая биометрия / Ультразвуковая биометрия', Field: '', type: 'text', colspan: 2, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'Оптическая биометрия / Ультразвуковая биометрия', Field: '', type: 'text', colspan: 2, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],
    [
        { type: '', colspan: 0.3},
        { text: "Пневмотонометрия", type: 'text', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: "Тонометрия по Маклакову", Field: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: "Передняя камера (мм)", Field: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: "Хрусталик (мм)", Field: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: "ПЭК", type: 'text', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: "ЦТР", type: 'text', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' }
    ],
    [
        { text: "OD", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_29', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_30', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_31', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_32', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_33', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_34', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' }
    ],
    [
        { text: "OS", type: 'text', colspan: 0.3, padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_35', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_36', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_37', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_38', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_39', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_40', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' }
    ],
];

const tableRowsDataDefinitionPhoria = [

    [
        { type: '', colspan: 1 },
        { text: '', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { text: 'В очковой коррекции', Field: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'В контактной коррекции', Field: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { type: '', colspan: 1 }
    ],
    [
        { type: '', colspan: 1 },
        { text: "Maddox Wing", type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_41', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_42', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { type: '', colspan: 1 },
    ],

    [
        { type: '', colspan: 1 },
        { text: "c add", type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_43', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_44', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { type: '', colspan: 1 },
    ],
    [
        { type: '', colspan: 1 },
        { text: "АК/А", type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_45', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_46', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { type: '', colspan: 1 }
    ],
    [
        { type: '', colspan: 1 },
        { text: "Фузионные резервы", type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'right' },
        { Field: '_47', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: '_48', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { type: '', colspan: 1 },
    ],

];

export default ophthalmologistExamination = [
    { id: 'PatientGlasses', name: 'Очки пациента', tableRows: tableRowsDataPatientGlasses},
    { id: 'Keratometry', name: 'Кератометрия', tableRows: tableRowsDataKeratometry},
    { id: 'EyeResearch', name: 'Исследования глаза', tableRows: tableRowsDataEyeResearch },
    { id: 'DefinitionPhoria', name: 'Определение фории', tableRows: tableRowsDataDefinitionPhoria}];
