import type { ID } from '../../types';

/**
 * JNVST कक्षा 9 प्रवेश परीक्षा — आधिकारिक तैयारी पाठ्यक्रम
 *
 * आधार:
 * - कक्षा 9 पार्श्व प्रवेश चयन परीक्षा का स्तर कक्षा 8 है।
 * - 2026 के NVS प्रॉस्पेक्टस में चार विषय हैं: हिंदी, अंग्रेज़ी, गणित और सामान्य विज्ञान।
 * - 2027-28 के लिए NVS का कक्षा 9 पार्श्व प्रवेश पोर्टल सक्रिय है। जब नया विस्तृत प्रॉस्पेक्टस
 *   उपलब्ध हो, इस स्रोत को आधिकारिक दस्तावेज़ के अनुसार सत्यापित किया जाएगा।
 *
 * यह फ़ाइल ऐप के लिए पाठ्यक्रम की एकमात्र सत्यापन योग्य आधार-सूची है।
 */

export type JnvstSubjectCode = 'hindi' | 'english' | 'mathematics' | 'science';

export interface JnvstSyllabusTopic {
  id: string;
  title: string;
  officialTitle?: string;
  chapterClass8?: string;
  notes?: string;
}

export interface JnvstSyllabusSubject {
  id: JnvstSubjectCode;
  title: string;
  marks: number;
  questionCount: number;
  topics: JnvstSyllabusTopic[];
}

export interface JnvstClass9Syllabus {
  examName: string;
  basis: string;
  totalMarks: number;
  totalQuestions: number;
  durationMinutes: number;
  subjects: JnvstSyllabusSubject[];
  sourceNote: string;
}

export const jnvstClass9Syllabus: JnvstClass9Syllabus = {
  examName: 'जवाहर नवोदय विद्यालय कक्षा 9 पार्श्व प्रवेश चयन परीक्षा',
  basis: 'कक्षा 8 के स्तर के पाठ्यक्रम पर आधारित',
  totalMarks: 100,
  totalQuestions: 100,
  durationMinutes: 150,
  sourceNote: 'विस्तृत विषय-सूची 2026 के NVS प्रॉस्पेक्टस से ली गई है; 2027-28 के आधिकारिक प्रॉस्पेक्टस में बदलाव आने पर इसे पुनः सत्यापित करना होगा।',
  subjects: [
    {
      id: 'hindi',
      title: 'हिंदी',
      marks: 15,
      questionCount: 15,
      topics: [
        { id: 'hin_01', title: 'वर्ण विचार और वर्तनी विवेक' },
        { id: 'hin_02', title: 'शब्द-भेद — स्रोत/उत्पत्ति' },
        { id: 'hin_03', title: 'पर्यायवाची और विलोम शब्द' },
        { id: 'hin_04', title: 'शब्द विवेक — शब्द-प्रयोग में सूक्ष्म अंतर' },
        { id: 'hin_05', title: 'पद-भेद की पहचान' },
        { id: 'hin_06', title: 'पद-परिचय' },
        { id: 'hin_07', title: 'अशुद्ध वाक्य को शुद्ध करना' },
        { id: 'hin_08', title: 'वाक्य रचनांतरण — सरल, संयुक्त और मिश्र' },
        { id: 'hin_09', title: 'मुहावरे' },
        { id: 'hin_10', title: 'लोकोक्तियाँ' },
        { id: 'hin_11', title: 'अपठित बोधात्मक प्रश्न' },
      ],
    },
    {
      id: 'english',
      title: 'अंग्रेज़ी',
      marks: 15,
      questionCount: 15,
      topics: [
        { id: 'eng_01', title: 'अपठित गद्यांश' },
        { id: 'eng_02', title: 'शब्द और वाक्य संरचना' },
        { id: 'eng_03', title: 'वर्तनी' },
        { id: 'eng_04', title: 'क्रम-विन्यास — उलझे हुए शब्दों को सही क्रम में लगाना' },
        { id: 'eng_05', title: 'कर्तृवाच्य और कर्मवाच्य' },
        { id: 'eng_06', title: 'तुलना की डिग्रियों का प्रयोग' },
        { id: 'eng_07', title: 'सहायक क्रियाएँ' },
        { id: 'eng_08', title: 'पूर्वसर्ग का प्रयोग' },
        { id: 'eng_09', title: 'काल के रूप' },
        { id: 'eng_10', title: 'प्रत्यक्ष और अप्रत्यक्ष कथन' },
      ],
    },
    {
      id: 'mathematics',
      title: 'गणित',
      marks: 35,
      questionCount: 35,
      topics: [
        { id: 'math_01', title: 'परिमेय संख्याएँ' },
        { id: 'math_02', title: 'वर्ग और वर्गमूल' },
        { id: 'math_03', title: 'घन और घनमूल' },
        { id: 'math_04', title: 'घातांक और घात' },
        { id: 'math_05', title: 'प्रत्यक्ष और प्रतिलोम समानुपात' },
        { id: 'math_06', title: 'राशियों की तुलना — प्रतिशत, लाभ-हानि, छूट, साधारण ब्याज और चक्रवृद्धि ब्याज' },
        { id: 'math_07', title: 'बीजीय व्यंजक और सर्वसमिकाएँ — गुणनखंडन सहित' },
        { id: 'math_08', title: 'एक चर वाले रैखिक समीकरण' },
        { id: 'math_09', title: 'चतुर्भुजों को समझना — समांतर चतुर्भुज, समचतुर्भुज, आयत, वर्ग और पतंग' },
        { id: 'math_10', title: 'क्षेत्रमिति — समतल आकृतियों का क्षेत्रफल; घन, घनाभ और बेलन का पृष्ठीय क्षेत्रफल तथा आयतन' },
        { id: 'math_11', title: 'आँकड़ों का प्रबंधन — दंड आलेख, पाई चार्ट, आँकड़ों का संगठन और प्रायिकता' },
      ],
    },
    {
      id: 'science',
      title: 'सामान्य विज्ञान',
      marks: 35,
      questionCount: 35,
      topics: [
        { id: 'sci_01', title: 'फसल उत्पादन एवं प्रबंध' },
        { id: 'sci_02', title: 'सूक्ष्मजीव — मित्र एवं शत्रु' },
        { id: 'sci_03', title: 'कोयला और पेट्रोलियम' },
        { id: 'sci_04', title: 'दहन और ज्वाला' },
        { id: 'sci_05', title: 'पौधों और जंतुओं का संरक्षण' },
        { id: 'sci_06', title: 'जंतुओं में जनन' },
        { id: 'sci_07', title: 'किशोरावस्था की ओर' },
        { id: 'sci_08', title: 'बल तथा दाब' },
        { id: 'sci_09', title: 'घर्षण' },
        { id: 'sci_10', title: 'ध्वनि' },
        { id: 'sci_11', title: 'विद्युत धारा के रासायनिक प्रभाव' },
        { id: 'sci_12', title: 'कुछ प्राकृतिक परिघटनाएँ' },
        { id: 'sci_13', title: 'प्रकाश' },
      ],
    },
  ],
};

export const jnvstSyllabusSubjectIds: Record<JnvstSubjectCode, ID> = {
  hindi: 'sub_hin',
  english: 'sub_eng',
  mathematics: 'sub_math',
  science: 'sub_sci',
};

export const getJnvstSyllabusSubject = (id: JnvstSubjectCode) =>
  jnvstClass9Syllabus.subjects.find((subject) => subject.id === id);

export const getJnvstSyllabusTopicCount = () =>
  jnvstClass9Syllabus.subjects.reduce((total, subject) => total + subject.topics.length, 0);
