import { THEME } from './../themes'

const tableRowsDataPatientGlasses = [
    [
        { type: '', colspan: 0.6, padding: 4 },
        { text: 'sph', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'cyl', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'ax', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'vis', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' }

    ],

    [
        { text: 'д/дал PD= мм', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ОП_Дл_PD_sph', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { type: '', colspan: 1, padding: 4 },
        { type: '', colspan: 1, padding: 4 },
        { type: '', colspan: 1, padding: 4 },
    ],

    [
        { text: 'OD', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ОП_Дл_OD_sph', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОП_Дл_OD_cyl', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОП_Дл_OD_ax', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОП_Дл_OD_vis', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],

    [
        { text: 'OS', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ОП_Дл_OS_sph', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОП_Дл_OS_cyl', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОП_Дл_OS_ax', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОП_Дл_OS_vis', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],

    [
        { text: 'д/бл PD= мм', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ОП_Бл_PD_sph', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { type: '', colspan: 1, padding: 4 },
        { type: '', colspan: 1, padding: 4 },
        { type: '', colspan: 1, padding: 4 },
    ],


    [
        { text: 'OD', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ОП_Бл_OD_sph', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОП_Бл_OD_cyl', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОП_Бл_OD_ax', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОП_Бл_OD_vis', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],

    [
        { text: 'OS', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ОП_Бл_OS_sph', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОП_Бл_OS_cyl', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОП_Бл_OS_ax', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОП_Бл_OS_vis', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],


    [
        { text: 'Ведущий глаз', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ОП_ВедущийГлаз', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { type: '', colspan: 1, padding: 4 },
        { type: '', colspan: 1, padding: 4 },
        { type: '', colspan: 1, padding: 4 },
    ],


    [
        { text: 'Вид линзы', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ОП_ВидЛинзы', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { type: '', colspan: 1, padding: 4 },
        { type: '', colspan: 1, padding: 4 },
        { type: '', colspan: 1, padding: 4 },
    ],

];

const tableRowsDataKeratometry = [

    [
        { type: '', colspan: 0.6, padding: 4 },
        { text: 'sph', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'cyl', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'ax', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'С.Ø (DIА)', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' }

    ],

    [
        { text: 'С узким зрачком', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'left', color: 'black' },

    ],

    [
        { text: 'OD', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'А_Уз_OD_sph', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'А_Уз_OD_cyl', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'А_Уз_OD_ax', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'А_Уз_OD_dio', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],

    [
        { text: 'OS', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'А_Уз_OS_sph', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'А_Уз_OS_cyl', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'А_Уз_OS_ax', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'А_Уз_OS_dio', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],

    [
        { text: 'В условиях мидриаза/циплоплегии', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'left', color: 'black' },

    ],

    [
        { text: 'OD', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'А_Ум_OD_sph', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'А_Ум_OD_cyl', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'А_Ум_OD_ax', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'А_Ум_OD_dio', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],

    [
        { text: 'OS', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'А_Ум_OS_sph', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'А_Ум_OS_cyl', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'А_Ум_OS_ax', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'А_Ум_OS_dio', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],

    [
        { text: 'Капли для мидриаза/циклоплегии', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'КаплиДляМидриаза', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { type: '', colspan: 1, padding: 4 },
        { type: '', colspan: 1, padding: 4 },
        { type: '', colspan: 1, padding: 4 },
    ],



];

const tableOpticalCorrection = [

    [
        { type: '', colspan: 0.6, padding: 4 },
        { text: 'vis б/к', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'sph', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'cyl', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'ax', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'vis с/к', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' }
    ],

    [
        { text: 'С узким зрачком', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'left', color: 'black' },

    ],

    [
        { text: 'OD', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ОК_УЗ_OD_vis_бк', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_УЗ_OD_sph', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_УЗ_OD_cyl', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_УЗ_OD_ax', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_УЗ_OD_vis_ск', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],

    [
        { text: 'OS', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ОК_УЗ_OS_vis_бк', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_УЗ_OS_sph', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_УЗ_OS_cyl', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_УЗ_OS_ax', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_УЗ_OS_vis_ск', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],

    [
        { text: 'С широким зрачком', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'left', color: 'black' },

    ],

    [
        { text: 'OD', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ОК_ШЗ_OD_vis_бк', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_ШЗ_OD_sph', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_ШЗ_OD_cyl', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_ШЗ_OD_ax', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_ШЗ_OD_vis_ск', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],

    [
        { text: 'OS', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ОК_ШЗ_OS_vis_бк', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_ШЗ_OS_sph', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_ШЗ_OS_cyl', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_ШЗ_OS_ax', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОК_ШЗ_OS_vis_ск', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],

    [
        { text: 'ADD', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ОК_ADD', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { type: '', colspan: 1, padding: 4 },
        { type: '', colspan: 1, padding: 4 },
        { type: '', colspan: 1, padding: 4 },
        { type: '', colspan: 1, padding: 4 },
    ],
];

const tableKeratometry = [
    [
        { text: '', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: '', type: 'text', colspan: 1, padding: 0, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center', backgroundColor:'yellow'  },
        { text: 'OD', type: 'text', colspan: 1, padding: 0, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center', backgroundColor:'yellow' },
        { text: '', type: 'text', colspan: 1, paddingRight: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center', backgroundColor:'yellow'  },
        { text: '', type: 'text', colspan: 1, paddingLeft: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center', backgroundColor:'yellow'  },
        { text: 'OS', type: 'text', colspan: 1, padding: 0, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center', backgroundColor:'yellow'},
        { text: '', type: 'text', colspan: 1, padding: 0, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center', backgroundColor:'yellow'  },
    ],

    [
 
        { text: '', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'D', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'mm', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'ax', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'D', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'mm', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'ax', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        
    ],

    [
        { text: 'K1', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'К_OD_D_K1', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OD_mm_K1', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OD_ax_K1', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OS_D_K1', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OS_mm_K1', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OS_ax_K1', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],

    [
        { text: 'K2', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'К_OD_D_K2', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OD_mm_K2', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OD_ax_K2', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OS_D_K2', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OS_mm_K2', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OS_ax_K2', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],
    

    [
        { text: 'AVE', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'К_OD_D_AVE', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OD_mm_AVE', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OD_ax_AVE', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OS_D_AVE', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OS_mm_AVE', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'К_OS_ax_AVE', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    ],

    [
        { text: 'cyl', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'К_OD_cyl', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'cyl', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'К_OS_cyl', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
    ],
    
    [
        { text: 'ax', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'К_OD_ax', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'ax', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'К_OS_ax', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
    ],
    
]

const tableEyeExamination = [

    [
        { text: '', type: 'text', colspan: 0.6, padding: 4, height: 80, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'Тонометрия', type: 'text', colspan: 2, paddingRight: 2, height: 80, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center', backgroundColor:'yellow' },
        { text: 'Оптическая биометрия / Ультразвуковая биометрия', type: 'text', colspan: 4, paddingRight: 2, height: 80, paddingLeft: 2, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center', backgroundColor:'yellow'},
        { text: 'Плотность эндотелиальных клеток, центр. толщина роговицы', type: 'text', colspan: 2, paddingRight: 2, paddingLeft: 2, height: 80, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center', backgroundColor:'yellow'},
    ],

    [
        { text: '', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        
        { text: 'Пневмотонометрия', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'по Маклакову', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },

        { text: 'Передняя камера (мм)', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'Хрусталик (мм)', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'Длина глаза/УЗИ (мм)', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'WTW (мм)', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
       
        { text: 'ПЭК', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'ЦТР', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    
    ],


    [
        { text: 'OD', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ИГ_OD_Пневмотонометрия', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ИГ_OD_ПоМаклакову', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        
        { Field: 'ИГ_OD_ПК', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ИГ_OD_Хрусталик', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ИГ_OD_ДГ', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ИГ_OD_WTW', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
   
        { Field: 'ИГ_OD_ПЭК', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ИГ_OD_ЦТР', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
   
    ],

    [
        { text: 'OS', type: 'text', colspan: 0.6, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'ИГ_OS_Пневмотонометрия', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ИГ_OS_ПоМаклакову', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        
        { Field: 'ИГ_OS_ПК', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ИГ_OS_Хрусталик', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ИГ_OS_ДГ', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ИГ_OS_WTW', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
   
        { Field: 'ИГ_OS_ПЭК', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ИГ_OS_ЦТР', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
   
    ],

]


const tablebBinocularStatus = [
    [
           { text: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { text: 'Wort test д/д', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'БС_WortTest_дд', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'д/б', type: 'text', colspan: 0.3, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'БС_WortTest_дб', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: '', type: '', colspan: 0.5, padding: 4, fontWeight: 'bold', textAlign: 'left', color: 'black' },
           { text: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
    ],

     [
         { text: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { text: 'Schober test д/д', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'БС_SchoberTest_дд', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'д/б', type: 'text', colspan: 0.3, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'БС_SchoberTest_дб', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: '', type: '', colspan: 0.5, padding: 4, fontWeight: 'bold', textAlign: 'left', color: 'black' },
        { text: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
    ],

    [
         { text: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { text: 'Cover test д/д', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'БС_CoverTest_дд', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'д/б', type: 'text', colspan: 0.3, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'БС_CoverTest_дб', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'Δ', type: 'text', colspan: 0.5, padding: 4, fontWeight: 'bold', textAlign: 'left', color: 'black' },
        { text: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
    ],

    [
         { text: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { text: 'Dev=', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'БС_dev_дд', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'д/б', type: 'text', colspan: 0.3, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'БС_dev_дб', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: 'град.', type: 'text', colspan: 0.5, padding: 4, fontWeight: 'bold', textAlign: 'left', color: 'black' },
        { text: '', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
    ],

      [
         { type: '', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { type: '', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { type: '', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { text: '3OA=', type: 'text', colspan: 0.3, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
        { Field: 'БС_Dev_3OA', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { type: '', colspan: 0.5, padding: 4, fontWeight: 'bold', textAlign: 'left', color: 'black' },
        { text: '', type: '', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
    ],

    [
       { type: '', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
       { text: 'Конвергенция', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
       { Field: 'БС_Конвергенция', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
       { text: 'Lag=', type: 'text', colspan: 0.3, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
       { Field: 'БС_Конвергенция_Lag', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
       { type: '', colspan: 0.5, padding: 4, fontWeight: 'bold', textAlign: 'left', color: 'black' },
       { type: '', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
   ],

   [
    { type: '', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
    { text: 'Подвижность', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
    { Field: 'БС_Подвижность', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    { text: 'AA', type: 'text', colspan: 0.3, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
    { Field: 'БС_Подвижность_AA', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
    { type: '', colspan: 0.5, padding: 4, fontWeight: 'bold', textAlign: 'left', color: 'black' },
    { type: '', colspan: 1, padding: 4, fontWeight: 'bold', textAlign: 'right', color: 'black' },
],
]

const tableDefinitionPhoria = [

    [
        { type: '', colspan: 0.5, paddingRight: 4 },
        { text: 'Фория для близи с полной коррекцией', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'В очковой коррекции', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
        { text: 'В контактной коррекции', type: 'text', colspan: 1, padding: 4, fontWeight: 'bold', color: 'black', textAlignVertical: 'bottom', textAlign: 'center' },
    ],

    [
        { text: 'Maddox Wing', type: 'text', colspan: 0.5, paddingRight: 4, color: 'black', fontWeight: 'bold', textAlign: 'right' },
        { Field: 'ОФ_MaddoxWing_Ф', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОФ_MaddoxWing_ОчкКор', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОФ_MaddoxWing_КонКор', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },

    ],

    [
        { text: 'c add', type: 'text', colspan: 0.5, paddingRight: 4, color: 'black', fontWeight: 'bold', textAlign: 'right' },
        { Field: 'ОФ_add_Ф', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОФ_add_ОчкКор', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОФ_add_КК', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },

    ],

    [
        { text: 'АК/А', type: 'text', colspan: 0.5, paddingRight: 4, color: 'black', fontWeight: 'bold', textAlign: 'right' },
        { Field: 'ОФ_ak_Ф', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОФ_ak_ОчкКор', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОФ_ak_КонКор', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },

    ],

    [
        { text: 'Фузионные резервы', type: 'text', colspan: 0.5, paddingRight: 4, color: 'black', fontWeight: 'bold', textAlign: 'right' },
        { Field: 'ОФ_ФР_Ф', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОФ_ФР_ОчкКор', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },
        { Field: 'ОФ_ФР_КонКор', type: 'input', colspan: 1, padding: 4, fontWeight: 'normal', color: 'black', textAlignVertical: 'center', textAlign: 'center' },

    ],


];


export default ophthalmologistExamination = {
    name: "Oсмотр офтальмолога",
    sections: [
        { id: 'PatientGlasses', name: 'Очки пациента', tableRows: tableRowsDataPatientGlasses },
        { id: 'Autorefractometry', name: 'Авторефрактометрия', tableRows: tableRowsDataKeratometry },
        { id: 'OpticalCorrection', name: 'Оптическая коррекция', tableRows: tableOpticalCorrection },
        { id: 'Keratometry', name: 'Кератометрия', tableRows: tableKeratometry },
        { id: 'EyeExamination', name: 'Исследование глаз', tableRows: tableEyeExamination},
        { id: 'binocularStatus', name: 'Бинокулярный статус', tableRows: tablebBinocularStatus},
        { id: 'definitionPhoria', name: 'Определение фории', tableRows: tableDefinitionPhoria},
    ]
};
