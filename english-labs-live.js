/* JNVST English Labs — direct production learner layer.
   Mounted only on the English lab and practice hash routes so the learner gets the current
   non-repeating system even when the compiled React asset is stale. */
(()=> {
  const VOCAB=[{"level":"beginner","word":"happy","meaning":"खुश","synonyms":["glad","cheerful"],"antonyms":["sad"]},{"level":"beginner","word":"small","meaning":"छोटा","synonyms":["little"],"antonyms":["large","big"]},{"level":"beginner","word":"begin","meaning":"शुरू करना","synonyms":["start"],"antonyms":["finish","end"]},{"level":"beginner","word":"help","meaning":"मदद करना","synonyms":["assist"],"antonyms":["hinder"]},{"level":"beginner","word":"quick","meaning":"तेज़","synonyms":["fast","rapid"],"antonyms":["slow"]},{"level":"beginner","word":"clean","meaning":"साफ","synonyms":["tidy"],"antonyms":["dirty"]},{"level":"beginner","word":"easy","meaning":"आसान","synonyms":["simple"],"antonyms":["difficult"]},{"level":"beginner","word":"quiet","meaning":"शांत","synonyms":["silent","calm"],"antonyms":["noisy"]},{"level":"basic","word":"careful","meaning":"सावधान","synonyms":["cautious"],"antonyms":["careless"]},{"level":"basic","word":"improve","meaning":"सुधारना / बेहतर होना","synonyms":["develop","enhance"],"antonyms":["worsen"]},{"level":"basic","word":"common","meaning":"सामान्य / आम","synonyms":["usual"],"antonyms":["rare"]},{"level":"basic","word":"correct","meaning":"सही","synonyms":["right","accurate"],"antonyms":["wrong","incorrect"]},{"level":"basic","word":"different","meaning":"अलग","synonyms":["distinct","unlike"],"antonyms":["same","similar"]},{"level":"basic","word":"simple","meaning":"सरल","synonyms":["easy","plain"],"antonyms":["complex"]},{"level":"basic","word":"choose","meaning":"चुनना","synonyms":["select"],"antonyms":["reject"]},{"level":"basic","word":"reason","meaning":"कारण","synonyms":["cause","basis"],"antonyms":["result"]},{"level":"intermediate","word":"carefully","meaning":"ध्यानपूर्वक","synonyms":["attentively"],"antonyms":["carelessly"]},{"level":"intermediate","word":"available","meaning":"उपलब्ध","synonyms":["accessible"],"antonyms":["unavailable"]},{"level":"intermediate","word":"similar","meaning":"समान / मिलता-जुलता","synonyms":["alike"],"antonyms":["different"]},{"level":"intermediate","word":"require","meaning":"आवश्यक होना","synonyms":["need"],"antonyms":["avoid"]},{"level":"intermediate","word":"identify","meaning":"पहचानना","synonyms":["recognise","detect"],"antonyms":["miss"]},{"level":"intermediate","word":"compare","meaning":"तुलना करना","synonyms":["contrast"],"antonyms":["separate"]},{"level":"intermediate","word":"evidence","meaning":"प्रमाण","synonyms":["proof","support"],"antonyms":["disproof"]},{"level":"intermediate","word":"infer","meaning":"निष्कर्ष निकालना","synonyms":["deduce","conclude"],"antonyms":["misunderstand"]},{"level":"jnvst","word":"passage","meaning":"गद्यांश / पाठ का अंश","synonyms":["extract","text"],"antonyms":[]},{"level":"jnvst","word":"main idea","meaning":"मुख्य विचार","synonyms":["central idea"],"antonyms":["minor detail"]},{"level":"jnvst","word":"detail","meaning":"विवरण","synonyms":["fact","particular"],"antonyms":["overview"]},{"level":"jnvst","word":"sequence","meaning":"क्रम","synonyms":["order"],"antonyms":["disorder"]},{"level":"jnvst","word":"support","meaning":"समर्थन करना / प्रमाण देना","synonyms":["back","confirm"],"antonyms":["oppose"]},{"level":"jnvst","word":"context","meaning":"संदर्भ","synonyms":["setting","background"],"antonyms":[]},{"level":"jnvst","word":"regularly","meaning":"नियमित रूप से","synonyms":["frequently","consistently"],"antonyms":["rarely"]},{"level":"jnvst","word":"unusual","meaning":"असामान्य","synonyms":["rare","uncommon"],"antonyms":["usual","common"]},{"level":"challenge","word":"cooperation","meaning":"सहयोग","synonyms":["collaboration","teamwork"],"antonyms":["conflict"]},{"level":"challenge","word":"accurate","meaning":"सटीक","synonyms":["correct","precise"],"antonyms":["inaccurate"]},{"level":"challenge","word":"essential","meaning":"आवश्यक","synonyms":["necessary","vital"],"antonyms":["optional","unnecessary"]},{"level":"challenge","word":"relevant","meaning":"प्रासंगिक","synonyms":["related","applicable"],"antonyms":["irrelevant"]},{"level":"challenge","word":"distractor","meaning":"भ्रमित करने वाला विकल्प","synonyms":["misleading option"],"antonyms":[]},{"level":"challenge","word":"interpret","meaning":"अर्थ समझना / व्याख्या करना","synonyms":["explain","understand"],"antonyms":["misinterpret"]},{"level":"challenge","word":"contrast","meaning":"अंतर दिखाना / विरोध","synonyms":["difference","distinction"],"antonyms":["similarity"]},{"level":"challenge","word":"conclusion","meaning":"निष्कर्ष","synonyms":["inference","result"],"antonyms":["introduction"]},{"level":"beginner","word":"big","meaning":"बड़ा","synonyms":["large"],"antonyms":["small"]},{"level":"beginner","word":"old","meaning":"पुराना / वृद्ध","synonyms":["aged"],"antonyms":["new","young"]},{"level":"beginner","word":"young","meaning":"युवा / कम उम्र का","synonyms":["youthful"],"antonyms":["old"]},{"level":"beginner","word":"fast","meaning":"तेज़","synonyms":["quick","rapid"],"antonyms":["slow"]},{"level":"beginner","word":"slow","meaning":"धीमा","synonyms":["unhurried"],"antonyms":["fast","quick"]},{"level":"beginner","word":"near","meaning":"पास","synonyms":["close"],"antonyms":["far"]},{"level":"beginner","word":"far","meaning":"दूर","synonyms":["distant"],"antonyms":["near"]},{"level":"beginner","word":"strong","meaning":"मज़बूत","synonyms":["powerful"],"antonyms":["weak"]},{"level":"beginner","word":"weak","meaning":"कमज़ोर","synonyms":["feeble"],"antonyms":["strong"]},{"level":"beginner","word":"friend","meaning":"मित्र / दोस्त","synonyms":["companion"],"antonyms":["enemy"]},{"level":"beginner","word":"answer","meaning":"उत्तर","synonyms":["reply","response"],"antonyms":["question"]},{"level":"beginner","word":"question","meaning":"प्रश्न","synonyms":["query"],"antonyms":["answer"]},{"level":"basic","word":"polite","meaning":"विनम्र","synonyms":["courteous","civil"],"antonyms":["rude"]},{"level":"basic","word":"honest","meaning":"ईमानदार","synonyms":["truthful"],"antonyms":["dishonest"]},{"level":"basic","word":"useful","meaning":"उपयोगी","synonyms":["helpful","valuable"],"antonyms":["useless"]},{"level":"basic","word":"important","meaning":"महत्वपूर्ण","synonyms":["significant","major"],"antonyms":["unimportant"]},{"level":"basic","word":"usual","meaning":"सामान्य / हमेशा का","synonyms":["normal","customary"],"antonyms":["unusual"]},{"level":"basic","word":"rare","meaning":"दुर्लभ / कम मिलने वाला","synonyms":["uncommon"],"antonyms":["common"]},{"level":"basic","word":"patient","meaning":"धैर्यवान","synonyms":["calm","tolerant"],"antonyms":["impatient"]},{"level":"basic","word":"active","meaning":"सक्रिय","synonyms":["energetic","busy"],"antonyms":["inactive"]},{"level":"basic","word":"local","meaning":"स्थानीय","synonyms":["regional"],"antonyms":["global","foreign"]},{"level":"basic","word":"method","meaning":"तरीका / विधि","synonyms":["way","procedure"],"antonyms":[]},{"level":"basic","word":"result","meaning":"परिणाम","synonyms":["outcome","effect"],"antonyms":["cause"]},{"level":"basic","word":"mistake","meaning":"गलती","synonyms":["error","fault"],"antonyms":["correctness"]},{"level":"intermediate","word":"observe","meaning":"ध्यान से देखना","synonyms":["notice","watch"],"antonyms":["ignore"]},{"level":"intermediate","word":"predict","meaning":"पूर्वानुमान लगाना","synonyms":["forecast"],"antonyms":["misjudge"]},{"level":"intermediate","word":"suggest","meaning":"सुझाव देना / संकेत देना","synonyms":["propose","indicate"],"antonyms":["reject"]},{"level":"intermediate","word":"explain","meaning":"समझाना","synonyms":["clarify"],"antonyms":["confuse"]},{"level":"intermediate","word":"describe","meaning":"वर्णन करना","synonyms":["portray","depict"],"antonyms":["omit"]},{"level":"intermediate","word":"include","meaning":"शामिल करना","synonyms":["contain"],"antonyms":["exclude"]},{"level":"intermediate","word":"avoid","meaning":"बचना","synonyms":["prevent","escape"],"antonyms":["face"]},{"level":"intermediate","word":"achieve","meaning":"प्राप्त करना","synonyms":["attain","accomplish"],"antonyms":["fail"]},{"level":"intermediate","word":"attempt","meaning":"प्रयास","synonyms":["try","effort"],"antonyms":["inaction"]},{"level":"intermediate","word":"purpose","meaning":"उद्देश्य","synonyms":["aim","intention"],"antonyms":[]},{"level":"intermediate","word":"mention","meaning":"उल्लेख करना","synonyms":["refer to","state"],"antonyms":["omit"]},{"level":"intermediate","word":"discuss","meaning":"चर्चा करना","synonyms":["debate","talk about"],"antonyms":["ignore"]},{"level":"jnvst","word":"central","meaning":"केंद्रीय / मुख्य","synonyms":["main","core"],"antonyms":["minor"]},{"level":"jnvst","word":"specific","meaning":"विशिष्ट / निश्चित","synonyms":["particular","exact"],"antonyms":["general"]},{"level":"jnvst","word":"general","meaning":"सामान्य / व्यापक","synonyms":["broad","overall"],"antonyms":["specific"]},{"level":"jnvst","word":"appropriate","meaning":"उपयुक्त","synonyms":["suitable","proper"],"antonyms":["inappropriate"]},{"level":"jnvst","word":"likely","meaning":"संभावित","synonyms":["probable"],"antonyms":["unlikely"]},{"level":"jnvst","word":"unlikely","meaning":"असंभावित","synonyms":["improbable"],"antonyms":["likely"]},{"level":"jnvst","word":"reference","meaning":"संदर्भ / उल्लेख","synonyms":["mention","citation"],"antonyms":[]},{"level":"jnvst","word":"paragraph","meaning":"अनुच्छेद","synonyms":["section"],"antonyms":[]},{"level":"jnvst","word":"instruction","meaning":"निर्देश","synonyms":["direction","guideline"],"antonyms":[]},{"level":"jnvst","word":"statement","meaning":"कथन / बयान","synonyms":["claim","assertion"],"antonyms":["question"]},{"level":"jnvst","word":"option","meaning":"विकल्प","synonyms":["choice","alternative"],"antonyms":[]},{"level":"jnvst","word":"clue","meaning":"संकेत","synonyms":["hint","signal"],"antonyms":["misdirection"]},{"level":"challenge","word":"analyze","meaning":"विश्लेषण करना","synonyms":["examine","study"],"antonyms":["ignore"]},{"level":"challenge","word":"evaluate","meaning":"मूल्यांकन करना","synonyms":["assess","judge"],"antonyms":["neglect"]},{"level":"challenge","word":"justify","meaning":"उचित ठहराना / कारण देना","synonyms":["defend","support"],"antonyms":["oppose"]},{"level":"challenge","word":"imply","meaning":"संकेत देना","synonyms":["suggest","indicate"],"antonyms":["state explicitly"]},{"level":"challenge","word":"determine","meaning":"निर्धारित करना / तय करना","synonyms":["decide","establish"],"antonyms":["doubt"]},{"level":"challenge","word":"distinguish","meaning":"अंतर पहचानना","synonyms":["differentiate","separate"],"antonyms":["confuse"]},{"level":"challenge","word":"significant","meaning":"महत्वपूर्ण / उल्लेखनीय","synonyms":["important","notable"],"antonyms":["insignificant"]},{"level":"challenge","word":"consistent","meaning":"संगत / लगातार समान","synonyms":["steady","uniform"],"antonyms":["inconsistent"]},{"level":"challenge","word":"logical","meaning":"तार्किक","synonyms":["reasonable","rational"],"antonyms":["illogical"]},{"level":"challenge","word":"consequence","meaning":"परिणाम","synonyms":["result","outcome"],"antonyms":["cause"]},{"level":"challenge","word":"perspective","meaning":"दृष्टिकोण","synonyms":["viewpoint","outlook"],"antonyms":[]},{"level":"challenge","word":"reliable","meaning":"विश्वसनीय","synonyms":["trustworthy","dependable"],"antonyms":["unreliable"]},{"level":"beginner","word":"afraid","meaning":"डरा हुआ","synonyms":["scared"],"antonyms":["brave"]},{"level":"beginner","word":"angry","meaning":"गुस्सा","synonyms":["mad"],"antonyms":["calm"]},{"level":"beginner","word":"bright","meaning":"चमकीला / उज्ज्वल","synonyms":["shiny"],"antonyms":["dark"]},{"level":"beginner","word":"dark","meaning":"अँधेरा / गहरा","synonyms":["dim"],"antonyms":["bright"]},{"level":"beginner","word":"heavy","meaning":"भारी","synonyms":["weighty"],"antonyms":["light"]},{"level":"beginner","word":"light","meaning":"हल्का / रोशनी","synonyms":["bright"],"antonyms":["heavy"]},{"level":"beginner","word":"empty","meaning":"खाली","synonyms":["vacant"],"antonyms":["full"]},{"level":"beginner","word":"full","meaning":"भरा हुआ","synonyms":["filled"],"antonyms":["empty"]},{"level":"beginner","word":"early","meaning":"जल्दी","synonyms":["prompt"],"antonyms":["late"]},{"level":"beginner","word":"late","meaning":"देर से","synonyms":["delayed"],"antonyms":["early"]},{"level":"beginner","word":"kind","meaning":"दयालु","synonyms":["gentle"],"antonyms":["unkind"]},{"level":"beginner","word":"brave","meaning":"बहादुर","synonyms":["courageous"],"antonyms":["cowardly"]},{"level":"beginner","word":"lazy","meaning":"आलसी","synonyms":["idle"],"antonyms":["active"]},{"level":"beginner","word":"busy","meaning":"व्यस्त","synonyms":["occupied"],"antonyms":["free"]},{"level":"beginner","word":"ready","meaning":"तैयार","synonyms":["prepared"],"antonyms":["unready"]},{"level":"beginner","word":"safe","meaning":"सुरक्षित","synonyms":["secure"],"antonyms":["unsafe"]},{"level":"beginner","word":"dangerous","meaning":"खतरनाक","synonyms":["risky"],"antonyms":["safe"]},{"level":"beginner","word":"dirty","meaning":"गंदा","synonyms":["unclean"],"antonyms":["clean"]},{"level":"beginner","word":"thirsty","meaning":"प्यासा","synonyms":["parched"],"antonyms":["quenched"]},{"level":"beginner","word":"hungry","meaning":"भूखा","synonyms":["starving"],"antonyms":["full"]},{"level":"beginner","word":"beautiful","meaning":"सुंदर","synonyms":["lovely"],"antonyms":["ugly"]},{"level":"beginner","word":"clever","meaning":"चतुर","synonyms":["smart"],"antonyms":["foolish"]},{"level":"beginner","word":"noisy","meaning":"शोर वाला","synonyms":["loud"],"antonyms":["quiet"]},{"level":"beginner","word":"soft","meaning":"नरम","synonyms":["gentle"],"antonyms":["hard"]},{"level":"beginner","word":"hard","meaning":"कठोर / कठिन","synonyms":["difficult"],"antonyms":["soft"]},{"level":"beginner","word":"nearby","meaning":"पास में","synonyms":["close"],"antonyms":["distant"]},{"level":"beginner","word":"above","meaning":"ऊपर","synonyms":["over"],"antonyms":["below"]},{"level":"beginner","word":"below","meaning":"नीचे","synonyms":["under"],"antonyms":["above"]},{"level":"beginner","word":"inside","meaning":"अंदर","synonyms":["within"],"antonyms":["outside"]},{"level":"beginner","word":"outside","meaning":"बाहर","synonyms":["outdoors"],"antonyms":["inside"]},{"level":"beginner","word":"together","meaning":"साथ में","synonyms":["jointly"],"antonyms":["apart"]},{"level":"basic","word":"arrive","meaning":"पहुँचना","synonyms":["reach"],"antonyms":["depart"]},{"level":"basic","word":"borrow","meaning":"उधार लेना","synonyms":["take temporarily"],"antonyms":["lend"]},{"level":"basic","word":"return","meaning":"वापस करना / लौटना","synonyms":["give back"],"antonyms":["keep"]},{"level":"basic","word":"protect","meaning":"रक्षा करना","synonyms":["guard"],"antonyms":["harm"]},{"level":"basic","word":"repair","meaning":"मरम्मत करना","synonyms":["fix"],"antonyms":["damage"]},{"level":"basic","word":"decide","meaning":"निर्णय लेना","synonyms":["choose"],"antonyms":["hesitate"]},{"level":"basic","word":"follow","meaning":"अनुसरण करना","synonyms":["obey"],"antonyms":["lead"]},{"level":"basic","word":"remember","meaning":"याद रखना","synonyms":["recall"],"antonyms":["forget"]},{"level":"basic","word":"forget","meaning":"भूल जाना","synonyms":["overlook"],"antonyms":["remember"]},{"level":"basic","word":"invite","meaning":"बुलाना / आमंत्रित करना","synonyms":["ask"],"antonyms":["exclude"]},{"level":"basic","word":"accept","meaning":"स्वीकार करना","synonyms":["receive"],"antonyms":["reject"]},{"level":"basic","word":"refuse","meaning":"मना करना","synonyms":["decline"],"antonyms":["accept"]},{"level":"basic","word":"build","meaning":"बनाना / निर्माण करना","synonyms":["construct"],"antonyms":["destroy"]},{"level":"basic","word":"break","meaning":"तोड़ना","synonyms":["crack"],"antonyms":["repair"]},{"level":"basic","word":"save","meaning":"बचाना / सुरक्षित रखना","synonyms":["protect"],"antonyms":["waste"]},{"level":"basic","word":"spend","meaning":"खर्च करना / समय बिताना","synonyms":["use"],"antonyms":["save"]},{"level":"basic","word":"travel","meaning":"यात्रा करना","synonyms":["journey"],"antonyms":["stay"]},{"level":"basic","word":"famous","meaning":"प्रसिद्ध","synonyms":["well-known"],"antonyms":["unknown"]},{"level":"basic","word":"possible","meaning":"संभव","synonyms":["feasible"],"antonyms":["impossible"]},{"level":"basic","word":"impossible","meaning":"असंभव","synonyms":["unfeasible"],"antonyms":["possible"]},{"level":"basic","word":"necessary","meaning":"आवश्यक","synonyms":["needed"],"antonyms":["unnecessary"]},{"level":"basic","word":"rude","meaning":"असभ्य","synonyms":["impolite"],"antonyms":["polite"]},{"level":"basic","word":"simpleton","meaning":"भोला / मूर्ख व्यक्ति","synonyms":["fool"],"antonyms":["genius"]},{"level":"basic","word":"correctly","meaning":"सही ढंग से","synonyms":["properly"],"antonyms":["incorrectly"]},{"level":"basic","word":"slowly","meaning":"धीरे-धीरे","synonyms":["gradually"],"antonyms":["quickly"]},{"level":"basic","word":"quickly","meaning":"जल्दी से","synonyms":["rapidly"],"antonyms":["slowly"]},{"level":"basic","word":"usually","meaning":"आमतौर पर","synonyms":["normally"],"antonyms":["rarely"]},{"level":"intermediate","word":"approach","meaning":"दृष्टिकोण / पास आना","synonyms":["method"],"antonyms":["avoidance"]},{"level":"intermediate","word":"benefit","meaning":"लाभ","synonyms":["advantage"],"antonyms":["disadvantage"]},{"level":"intermediate","word":"contain","meaning":"शामिल होना / रखना","synonyms":["include"],"antonyms":["exclude"]},{"level":"intermediate","word":"create","meaning":"बनाना / सृजन करना","synonyms":["produce"],"antonyms":["destroy"]},{"level":"intermediate","word":"discover","meaning":"खोज निकालना","synonyms":["find"],"antonyms":["lose"]},{"level":"intermediate","word":"encourage","meaning":"प्रोत्साहित करना","synonyms":["motivate"],"antonyms":["discourage"]},{"level":"intermediate","word":"familiar","meaning":"परिचित","synonyms":["known"],"antonyms":["unfamiliar"]},{"level":"intermediate","word":"flexible","meaning":"लचीला","synonyms":["adaptable"],"antonyms":["rigid"]},{"level":"intermediate","word":"frequent","meaning":"बार-बार होने वाला","synonyms":["common"],"antonyms":["rare"]},{"level":"intermediate","word":"gradually","meaning":"धीरे-धीरे","synonyms":["slowly"],"antonyms":["suddenly"]},{"level":"intermediate","word":"notice","meaning":"ध्यान देना / सूचना","synonyms":["observe"],"antonyms":["ignore"]},{"level":"intermediate","word":"organize","meaning":"व्यवस्थित करना","synonyms":["arrange"],"antonyms":["disorganize"]},{"level":"intermediate","word":"participate","meaning":"भाग लेना","synonyms":["join"],"antonyms":["withdraw"]},{"level":"intermediate","word":"prevent","meaning":"रोकना","synonyms":["stop"],"antonyms":["allow"]},{"level":"intermediate","word":"replace","meaning":"बदल देना","synonyms":["substitute"],"antonyms":["retain"]},{"level":"intermediate","word":"survive","meaning":"जीवित रहना","synonyms":["endure"],"antonyms":["perish"]},{"level":"intermediate","word":"adapt","meaning":"अनुकूल बनना / बनाना","synonyms":["adjust"],"antonyms":["resist"]},{"level":"intermediate","word":"accurately","meaning":"सटीक रूप से","synonyms":["precisely"],"antonyms":["incorrectly"]},{"level":"intermediate","word":"eventually","meaning":"अंततः","synonyms":["finally"],"antonyms":["immediately"]},{"level":"intermediate","word":"freely","meaning":"स्वतंत्र रूप से","synonyms":["openly"],"antonyms":["restrictedly"]},{"level":"intermediate","word":"mostly","meaning":"अधिकतर","synonyms":["mainly"],"antonyms":["rarely"]},{"level":"intermediate","word":"clearly","meaning":"स्पष्ट रूप से","synonyms":["plainly"],"antonyms":["vaguely"]},{"level":"jnvst","word":"author","meaning":"लेखक","synonyms":["writer"],"antonyms":["reader"]},{"level":"jnvst","word":"character","meaning":"पात्र / चरित्र","synonyms":["figure"],"antonyms":["background"]},{"level":"jnvst","word":"title","meaning":"शीर्षक","synonyms":["heading"],"antonyms":["content"]},{"level":"jnvst","word":"heading","meaning":"शीर्षक","synonyms":["title"],"antonyms":["body"]},{"level":"jnvst","word":"fact","meaning":"तथ्य","synonyms":["truth"],"antonyms":["fiction"]},{"level":"jnvst","word":"opinion","meaning":"राय","synonyms":["view"],"antonyms":["fact"]},{"level":"jnvst","word":"cause","meaning":"कारण","synonyms":["reason"],"antonyms":["effect"]},{"level":"jnvst","word":"effect","meaning":"प्रभाव / परिणाम","synonyms":["result"],"antonyms":["cause"]},{"level":"jnvst","word":"narrator","meaning":"कथावाचक","synonyms":["storyteller"],"antonyms":["listener"]},{"level":"jnvst","word":"event","meaning":"घटना","synonyms":["incident"],"antonyms":["non-event"]},{"level":"jnvst","word":"setting","meaning":"कहानी का स्थान और समय","synonyms":["background"],"antonyms":["action"]},{"level":"jnvst","word":"message","meaning":"संदेश","synonyms":["lesson"],"antonyms":["silence"]},{"level":"jnvst","word":"theme","meaning":"मुख्य विषय / भाव","synonyms":["subject"],"antonyms":["detail"]},{"level":"jnvst","word":"summary","meaning":"सारांश","synonyms":["outline"],"antonyms":["detail"]},{"level":"jnvst","word":"evidence-based","meaning":"प्रमाण पर आधारित","synonyms":["supported"],"antonyms":["unsupported"]},{"level":"jnvst","word":"supporting","meaning":"समर्थन करने वाला","synonyms":["backing"],"antonyms":["opposing"]},{"level":"jnvst","word":"speaker","meaning":"वक्ता","synonyms":["talker"],"antonyms":["listener"]},{"level":"jnvst","word":"dialogue","meaning":"संवाद","synonyms":["conversation"],"antonyms":["monologue"]},{"level":"jnvst","word":"factually","meaning":"तथ्यात्मक रूप से","synonyms":["accurately"],"antonyms":["falsely"]},{"level":"jnvst","word":"directly","meaning":"सीधे तौर पर","synonyms":["straightly"],"antonyms":["indirectly"]},{"level":"jnvst","word":"implicitly","meaning":"अप्रत्यक्ष रूप से","synonyms":["indirectly"],"antonyms":["explicitly"]},{"level":"jnvst","word":"explicitly","meaning":"स्पष्ट रूप से","synonyms":["clearly"],"antonyms":["implicitly"]},{"level":"challenge","word":"ambiguous","meaning":"अस्पष्ट / दो अर्थ वाला","synonyms":["unclear"],"antonyms":["clear"]},{"level":"challenge","word":"apparent","meaning":"स्पष्ट दिखाई देने वाला","synonyms":["evident"],"antonyms":["hidden"]},{"level":"challenge","word":"assumption","meaning":"धारणा / मान्यता","synonyms":["belief"],"antonyms":["fact"]},{"level":"challenge","word":"contradiction","meaning":"विरोधाभास","synonyms":["inconsistency"],"antonyms":["agreement"]},{"level":"challenge","word":"crucial","meaning":"अत्यंत महत्वपूर्ण","synonyms":["vital"],"antonyms":["minor"]},{"level":"challenge","word":"demonstrate","meaning":"प्रदर्शित करना / साबित करना","synonyms":["show"],"antonyms":["hide"]},{"level":"challenge","word":"emphasize","meaning":"जोर देना","synonyms":["stress"],"antonyms":["downplay"]},{"level":"challenge","word":"implication","meaning":"निहित अर्थ / परिणाम","synonyms":["suggestion"],"antonyms":["statement"]},{"level":"challenge","word":"precise","meaning":"सटीक","synonyms":["exact"],"antonyms":["vague"]},{"level":"challenge","word":"reluctant","meaning":"अनिच्छुक","synonyms":["unwilling"],"antonyms":["eager"]},{"level":"challenge","word":"subtle","meaning":"सूक्ष्म / बारीक","synonyms":["delicate"],"antonyms":["obvious"]},{"level":"challenge","word":"sufficient","meaning":"पर्याप्त","synonyms":["enough"],"antonyms":["insufficient"]},{"level":"challenge","word":"valid","meaning":"मान्य / तार्किक रूप से सही","synonyms":["sound"],"antonyms":["invalid"]},{"level":"challenge","word":"verify","meaning":"सत्यापित करना","synonyms":["confirm"],"antonyms":["falsify"]},{"level":"challenge","word":"whereas","meaning":"जबकि","synonyms":["while"],"antonyms":["similarly"]},{"level":"challenge","word":"nevertheless","meaning":"फिर भी","synonyms":["however"],"antonyms":["therefore"]},{"level":"challenge","word":"therefore","meaning":"इसलिए / अतः","synonyms":["thus"],"antonyms":["nevertheless"]},{"level":"challenge","word":"consequently","meaning":"फलतः / परिणामस्वरूप","synonyms":["therefore"],"antonyms":["previously"]},{"level":"challenge","word":"occasionally","meaning":"कभी-कभी","synonyms":["sometimes"],"antonyms":["always"]},{"level":"challenge","word":"primarily","meaning":"मुख्य रूप से","synonyms":["mainly"],"antonyms":["secondarily"]},{"level":"challenge","word":"ultimately","meaning":"अंततः","synonyms":["finally"],"antonyms":["initially"]},{"level":"challenge","word":"apparently","meaning":"प्रतीत होता है कि","synonyms":["seemingly"],"antonyms":["certainly"]},{"level":"challenge","word":"coherent","meaning":"सुसंगत","synonyms":["logical"],"antonyms":["incoherent"]},{"level":"challenge","word":"comprehensive","meaning":"व्यापक / सम्पूर्ण","synonyms":["complete"],"antonyms":["limited"]},{"level":"challenge","word":"interpretation","meaning":"व्याख्या / अर्थ-निर्धारण","synonyms":["explanation"],"antonyms":["misreading"]},{"level":"challenge","word":"objective","meaning":"निष्पक्ष / उद्देश्य","synonyms":["impartial"],"antonyms":["biased"]}];
  const OVERLAY='jnvst-english-live-overlay';
  const state={
    lab:'',
    mode:'learn',
    direction:'hi-en',
    level:0,
    transIndex:0,
    vocabIndex:0,
    vocabRound:1,
    vocabOrder:[],
    transSeen:new Set(),
    currentTrans:null,
    answer:'',
    checked:false,
    vocabMode:'meaning',
    vocabSelected:'',
    vocabChecked:false
  };

  const subjects=[
    ['Ravi','रवि','m'],['Meena','मीना','f'],['Arjun','अर्जुन','m'],['Nita','नीता','f'],['Aman','अमन','m'],
    ['Tara','तारा','f'],['Rohan','रोहन','m'],['Priya','प्रिया','f'],['Kabir','कबीर','m'],['Sana','सना','f'],
    ['Vivek','विवेक','m'],['Anu','अनु','f'],['Dev','देव','m'],['Kavya','काव्या','f'],['Mohan','मोहन','m'],
    ['Pooja','पूजा','f'],['Rahul','राहुल','m'],['Neha','नेहा','f'],['Karan','करण','m'],['Isha','ईशा','f']
  ].map(x=>({en:x[0],hi:x[1],g:x[2]}));

  const actions=[
    {base:'read the book',third:'reads the book',ing:'reading the book',past:'read the book',p:['किताब पढ़ता है','किताब पढ़ती है'],pp:['किताब पढ़ी','किताब पढ़ी']},
    {base:'write a letter',third:'writes a letter',ing:'writing a letter',past:'wrote a letter',p:['एक पत्र लिखता है','एक पत्र लिखती है'],pp:['एक पत्र लिखा','एक पत्र लिखी']},
    {base:'solve the problem',third:'solves the problem',ing:'solving the problem',past:'solved the problem',p:['समस्या हल करता है','समस्या हल करती है'],pp:['समस्या हल की','समस्या हल की']},
    {base:'check the answer',third:'checks the answer',ing:'checking the answer',past:'checked the answer',p:['उत्तर जाँचता है','उत्तर जाँचती है'],pp:['उत्तर जाँचा','उत्तर जाँचा']},
    {base:'open the door',third:'opens the door',ing:'opening the door',past:'opened the door',p:['दरवाज़ा खोलता है','दरवाज़ा खोलती है'],pp:['दरवाज़ा खोला','दरवाज़ा खोला']},
    {base:'close the box',third:'closes the box',ing:'closing the box',past:'closed the box',p:['डिब्बा बंद करता है','डिब्बा बंद करती है'],pp:['डिब्बा बंद किया','डिब्बा बंद किया']},
    {base:'clean the room',third:'cleans the room',ing:'cleaning the room',past:'cleaned the room',p:['कमरा साफ़ करता है','कमरा साफ़ करती है'],pp:['कमरा साफ़ किया','कमरा साफ़ किया']},
    {base:'carry the bag',third:'carries the bag',ing:'carrying the bag',past:'carried the bag',p:['बैग ले जाता है','बैग ले जाती है'],pp:['बैग ले गया','बैग ले गई']},
    {base:'answer the question',third:'answers the question',ing:'answering the question',past:'answered the question',p:['प्रश्न का उत्तर देता है','प्रश्न का उत्तर देती है'],pp:['प्रश्न का उत्तर दिया','प्रश्न का उत्तर दिया']},
    {base:'watch the film',third:'watches the film',ing:'watching the film',past:'watched the film',p:['फिल्म देखता है','फिल्म देखती है'],pp:['फिल्म देखी','फिल्म देखी']},
    {base:'visit the library',third:'visits the library',ing:'visiting the library',past:'visited the library',p:['पुस्तकालय जाता है','पुस्तकालय जाती है'],pp:['पुस्तकालय गया','पुस्तकालय गई']},
    {base:'practise the exercise',third:'practises the exercise',ing:'practising the exercise',past:'practised the exercise',p:['अभ्यास करता है','अभ्यास करती है'],pp:['अभ्यास किया','अभ्यास किया']},
    {base:'help the teacher',third:'helps the teacher',ing:'helping the teacher',past:'helped the teacher',p:['शिक्षक की मदद करता है','शिक्षक की मदद करती है'],pp:['शिक्षक की मदद की','शिक्षक की मदद की']},
    {base:'study the lesson',third:'studies the lesson',ing:'studying the lesson',past:'studied the lesson',p:['पाठ पढ़ता है','पाठ पढ़ती है'],pp:['पाठ पढ़ा','पाठ पढ़ा']},
    {base:'explain the example',third:'explains the example',ing:'explaining the example',past:'explained the example',p:['उदाहरण समझाता है','उदाहरण समझाती है'],pp:['उदाहरण समझाया','उदाहरण समझाया']},
    {base:'compare the answers',third:'compares the answers',ing:'comparing the answers',past:'compared the answers',p:['उत्तर की तुलना करता है','उत्तर की तुलना करती है'],pp:['उत्तर की तुलना की','उत्तर की तुलना की']},
    {base:'choose the option',third:'chooses the option',ing:'choosing the option',past:'chose the option',p:['विकल्प चुनता है','विकल्प चुनती है'],pp:['विकल्प चुना','विकल्प चुना']},
    {base:'collect the papers',third:'collects the papers',ing:'collecting the papers',past:'collected the papers',p:['कागज़ इकट्ठे करता है','कागज़ इकट्ठे करती है'],pp:['कागज़ इकट्ठे किए','कागज़ इकट्ठे किए']},
    {base:'prepare the notebook',third:'prepares the notebook',ing:'preparing the notebook',past:'prepared the notebook',p:['कॉपी तैयार करता है','कॉपी तैयार करती है'],pp:['कॉपी तैयार की','कॉपी तैयार की']},
    {base:'arrange the books',third:'arranges the books',ing:'arranging the books',past:'arranged the books',p:['किताबें व्यवस्थित करता है','किताबें व्यवस्थित करती है'],pp:['किताबें व्यवस्थित कीं','किताबें व्यवस्थित कीं']},
    {base:'complete the task',third:'completes the task',ing:'completing the task',past:'completed the task',p:['काम पूरा करता है','काम पूरा करती है'],pp:['काम पूरा किया','काम पूरा किया']},
    {base:'revise the chapter',third:'revises the chapter',ing:'revising the chapter',past:'revised the chapter',p:['अध्याय दोहराता है','अध्याय दोहराती है'],pp:['अध्याय दोहराया','अध्याय दोहराया']},
    {base:'draw the picture',third:'draws the picture',ing:'drawing the picture',past:'drew the picture',p:['चित्र बनाता है','चित्र बनाती है'],pp:['चित्र बनाया','चित्र बनाया']},
    {base:'discuss the story',third:'discusses the story',ing:'discussing the story',past:'discussed the story',p:['कहानी पर चर्चा करता है','कहानी पर चर्चा करती है'],pp:['कहानी पर चर्चा की','कहानी पर चर्चा की']}
  ];
  const times=[
    ['every morning','हर सुबह'],['every evening','हर शाम'],['after school','स्कूल के बाद'],['on Sundays','रविवार को'],
    ['before dinner','रात के खाने से पहले'],['in the afternoon','दोपहर में'],['on weekdays','कामकाजी दिनों में'],
    ['before the exam','परीक्षा से पहले'],['after breakfast','नाश्ते के बाद'],['during the lesson','पाठ के दौरान'],
    ['in the evening','शाम को'],['at the weekend','सप्ताहांत में']
  ];
  const places=[
    ['the school','स्कूल'],['the library','पुस्तकालय'],['the classroom','कक्षा'],['the market','बाज़ार'],
    ['the playground','खेल का मैदान'],['the village','गाँव'],['the station','स्टेशन'],['the park','पार्क'],
    ['the laboratory','प्रयोगशाला'],['the reading room','पठन कक्ष'],['the hall','सभागार'],['the office','कार्यालय']
  ];
  const familyMap={1:[0,2,4,5,6],2:[0,1,4,5,6],3:[0,1,2,3,6,8],4:[1,2,3,4,7,9,10],5:[2,3,6,7,9,10,11],6:[2,3,6,7,8,9,10,11]};

  const esc=v=>String(v).replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
  const norm=v=>String(v||'').toLowerCase().trim().replace(/[’']/g,"'").replace(/[.!?।,:;]+$/g,'').replace(/\s+/g,' ');
  const pick=(a,n)=>a[((n%a.length)+a.length)%a.length];
  const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;};

  const makeTranslation=(level,n)=>{
    const s=pick(subjects,n);
    const a=pick(actions,Math.floor(n/20));
    const t=pick(times,Math.floor(n/(20*24)));
    const p=pick(places,Math.floor(n/(20*24*12)));
    const second=pick(actions,Math.floor(n/17)+7);
    const g=s.g==='f'?1:0;
    const family=pick(familyMap[level],n+level*19);
    let en,hi,gp,ex,hint,steps;
    if(family===0){
      en=s.en+' '+a.third+' '+t[0]+'.'; hi=s.hi+' '+a.p[g]+' '+t[1]+'।'; gp='Simple Present: subject + V-s/es + phrase'; hint='Habit/frequency clue पहचानें।'; ex='यह habitual action है। Singular subject के साथ English verb का s/es form आता है।'; steps=['Subject पहचानें।','Habit/time clue पहचानें।','Singular subject के लिए V-s/es चुनें।','बाकी phrase जोड़ें।'];
    } else if(family===1){
      en=s.en+' is '+a.ing+' now.'; hi=s.hi+' अभी '+(g?a.p[1].replace(/ती है$/,'रही है'):a.p[0].replace(/ता है$/,'रहा है'))+'।'; gp='Present Continuous: is + V-ing'; hint='अभी/now = ongoing action।'; ex='Present Continuous में is + V-ing वर्तमान में चल रहे काम को दिखाता है।'; steps=['Ongoing action पहचानें।','Singular subject के लिए is रखें।','Main verb में -ing लगाएँ।','पूरा sentence पढ़कर अर्थ मिलाएँ।'];
    } else if(family===2){
      en=s.en+' '+a.past+' yesterday.'; hi=s.hi+' ने कल '+a.pp[g]+'।'; gp='Simple Past: V2'; hint='Yesterday past-time clue है।'; ex='Completed past action में verb का past form आता है।'; steps=['Past clue पहचानें।','V2 चुनें।','Subject + past action बनाएँ।','Time clue जोड़ें।'];
    } else if(family===3){
      en=s.en+' will '+a.base+' '+t[0]+'.'; hi=s.hi+' '+t[1]+' यह काम '+(g?'करेगी':'करेगा')+'।'; gp='Future: will + V1'; hint='Future action में will + V1।'; ex='Will के बाद base verb आता है।'; steps=['Future clue पहचानें।','Will लगाएँ।','Main verb V1 रखें।','Time phrase जोड़ें।'];
    } else if(family===4){
      en=s.en+' does not '+a.base+' '+t[0]+'.'; hi=s.hi+' '+a.p[g].replace(/ता है$/,'ता नहीं है').replace(/ती है$/,'ती नहीं है')+' '+t[1]+'।'; gp='Simple Present Negative: does not + V1'; hint='Singular negative = does not + V1।'; ex='Does not tense को carry करता है, इसलिए main verb base form में रहता है।'; steps=['Negative पहचानें।','Singular subject देखें।','Does not लगाएँ।','Main verb V1 रखें।'];
    } else if(family===5){
      en='Does '+s.en+' '+a.base+' '+t[0]+'?'; hi='क्या '+s.hi+' '+a.p[g]+' '+t[1]+'?'; gp='Does + subject + V1?'; hint='क्या... करता/करती है?'; ex='Does question में tense mark है; main verb base form में रहता है।'; steps=['Question पहचानें।','Does लगाएँ।','Subject रखें।','Main verb V1 रखें।'];
    } else if(family===6){
      en=s.en+' should '+a.base+' '+t[0]+'.'; hi=s.hi+' को '+t[1]+' '+a.p[g].replace(/ता है$/,'ना चाहिए').replace(/ती है$/,'नी चाहिए')+'।'; gp='Modal: should + V1'; hint='चाहिए = should।'; ex='Should advice देता है और इसके बाद base verb आता है।'; steps=['Advice पहचानें।','Should रखें।','Main verb V1 रखें।','बाकी phrase जोड़ें।'];
    } else if(family===7){
      en='If '+s.en+' '+a.third+', '+s.en+' will '+second.base+' tomorrow.'; hi='यदि '+s.hi+' '+a.p[g]+' तो '+s.hi+' कल '+(g?'यह काम करेगी':'यह काम करेगा')+'।'; gp='First Conditional: If + Present, will + V1'; hint='If-clause present; result will + V1।'; ex='First Conditional condition और future result को जोड़ता है।'; steps=['Condition अलग करें।','If-clause में present रखें।','Result में will + V1 रखें।','Cause → result जाँचें।'];
    } else if(family===8){
      en=s.en+' has already '+a.past+'.'; hi=s.hi+' पहले ही '+a.pp[g]+' है।'; gp='Present Perfect: has + V3'; hint='पहले ही/already = completed result।'; ex='Singular subject के साथ has + V3 आता है।'; steps=['Completed result पहचानें।','Has चुनें।','V3 रखें।','Already की position जाँचें।'];
    } else if(family===9){
      en='When the teacher arrived, '+s.en+' was '+a.ing+'.'; hi='जब शिक्षक पहुँचे, तब '+s.hi+' '+(g?a.p[1].replace(/ती है$/,'रही थी'):a.p[0].replace(/ता है$/,'रहा था'))+'।'; gp='When + Simple Past, Past Continuous'; hint='एक past event, दूसरा ongoing past action।'; ex='When-clause completed event है; दूसरा action उस समय चल रहा था।'; steps=['दोनों past actions पहचानें।','When-clause में Simple Past रखें।','Ongoing action में was + V-ing रखें।','Final meaning जाँचें।'];
    } else if(family===10){
      en=s.en+' is more careful than the previous student.'; hi=s.hi+' पिछले छात्र से अधिक सावधान है।'; gp='Comparative: more + adjective + than'; hint='दो लोगों की तुलना है।'; ex='Long adjective के comparison में more + adjective + than प्रयोग होता है।'; steps=['दोनों लोगों की पहचान करें।','Comparative relation देखें।','More careful बनाएँ।','Than के बाद comparator रखें।'];
    } else {
      en='The student who '+a.base+' understands the lesson better.'; hi='जो छात्र '+a.p[g]+' है, वह पाठ बेहतर समझता है।'; gp='Relative clause with who'; hint='जो/जिस... व्यक्ति को describe करता है।'; ex='Who-clause किसी noun के बारे में extra information देता है।'; steps=['Main noun पहचानें।','Extra information पहचानें।','Person के लिए who लगाएँ।','Main clause पूरा करें।'];
    }
    return {en,hi,gp,ex,hint,steps};
  };

  const getTranslation=(level,n,dir)=>{
    let k=n;
    for(let i=0;i<1000;i++,k++){
      const item=makeTranslation(level,k);
      const key=item.en+'||'+item.hi;
      if(!state.transSeen.has(key)){state.transSeen.add(key);return dir==='hi-en'?item:{...item,en:item.hi,hi:item.en};}
    }
    const item=makeTranslation(level,n+10000);
    return dir==='hi-en'?item:{...item,en:item.hi,hi:item.en};
  };

  const resetVocabulary=()=>{
    const chosen=state.level==='all'?VOCAB:VOCAB.filter(x=>x.level===state.level);
    state.vocabOrder=shuffle(chosen.map((_,i)=>i)); state.vocabIndex=0; state.vocabRound=1;
  };

  const vocabItem=()=>{
    const chosen=state.level==='all'?VOCAB:VOCAB.filter(x=>x.level===state.level);
    if(!chosen.length)return null;
    if(!state.vocabOrder.length||state.vocabIndex>=state.vocabOrder.length){
      state.vocabRound++;
      state.vocabOrder=shuffle(chosen.map((_,i)=>i));
      state.vocabIndex=0;
    }
    return chosen[state.vocabOrder[state.vocabIndex]];
  };

  const vocabExample=(item,n)=>{
    const templates=[
      'The teacher explained "'+item.word+'" while discussing today\'s passage.',
      'Riya used "'+item.word+'" in a new sentence during revision.',
      'Kabir wrote "'+item.word+'" in his vocabulary notebook.',
      'The student remembered "'+item.word+'" from its Hindi meaning.',
      'The class discussed the word "'+item.word+'" in context.',
      'Anu practised "'+item.word+'" before the English test.',
      'The passage gave a useful context for "'+item.word+'".',
      'During revision, Vivek recalled the meaning of "'+item.word+'".'
    ];
    return templates[n%templates.length];
  };

  const style=()=>{
    if(document.getElementById('jnvst-english-live-style'))return;
    const s=document.createElement('style');s.id='jnvst-english-live-style';
    s.textContent=`
      #${OVERLAY}{position:fixed;inset:0;z-index:2147483000;background:#f4f7fb;color:#172033;overflow:auto;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      #${OVERLAY} *{box-sizing:border-box}
      .jel-wrap{max-width:1140px;margin:0 auto;padding:24px 18px 60px}
      .jel-top{display:flex;justify-content:space-between;gap:18px;align-items:flex-start}
      .jel-kicker{font-size:12px;font-weight:900;letter-spacing:.08em;color:#5b718c}
      .jel-title{margin:5px 0;font-size:clamp(29px,5vw,46px);line-height:1.1;font-weight:950}
      .jel-sub{margin:0;color:#657890;line-height:1.65;max-width:820px}
      .jel-card{background:#fff;border:1px solid #dce5ef;border-radius:20px;padding:20px;box-shadow:0 12px 32px rgba(18,39,66,.07);margin-top:16px}
      .jel-tabs,.jel-row{display:flex;flex-wrap:wrap;gap:8px}
      .jel-btn{appearance:none;border:1px solid #d2dce8;background:#fff;color:#294764;border-radius:12px;padding:10px 14px;font-weight:850;cursor:pointer}
      .jel-btn.primary{background:#2459a6;color:#fff;border-color:#2459a6}
      .jel-btn.active{background:#edf4ff;color:#2459a6;border-color:#9fc0eb}
      .jel-levels{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:8px;margin-top:12px}
      .jel-level{padding:11px;border:1px solid #dce5ef;border-radius:12px;background:#fff;cursor:pointer;text-align:left}
      .jel-level.active{background:#edf4ff;border-color:#9fc0eb}
      .jel-level b{display:block}.jel-level span{display:block;margin-top:3px;color:#6a7d93;font-size:12px;line-height:1.45}
      .jel-counter{font-size:12px;font-weight:900;letter-spacing:.05em;color:#647991}
      .jel-source{margin-top:12px;padding:19px;border-radius:16px;background:#f8fafc;border:1px solid #e1e8f0}
      .jel-source h2{margin:7px 0 0;font-size:clamp(23px,4vw,32px);line-height:1.55}
      .jel-answer{margin-top:12px;padding:18px;border-radius:16px;background:#f1f6ff;border:1px solid #d6e4f7}
      .jel-answer h3{margin:6px 0 10px;font-size:clamp(21px,3.5vw,30px);line-height:1.5}
      .jel-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
      .jel-mini{padding:13px;border:1px solid #dfe7f0;border-radius:12px;background:#fff}
      .jel-mini p{margin:5px 0 0;color:#536980;line-height:1.6}
      .jel-steps{margin-top:12px;padding:14px;border:1px solid #dfe7f0;border-radius:12px;background:#fff}
      .jel-steps ol{margin:8px 0 0;padding-left:22px;color:#4e647c;line-height:1.8}
      .jel-word{font-size:clamp(43px,8vw,76px);font-weight:950;color:#2459a6;line-height:1.05;margin:10px 0 12px;overflow-wrap:anywhere}
      .jel-meaning{font-size:30px;font-weight:900;color:#263e5b;line-height:1.35}
      .jel-context{margin-top:14px;padding:16px;border-radius:14px;border:1px solid #dfe7f0;background:#fafcff}
      .jel-context p{font-size:18px;line-height:1.75;margin:6px 0}.jel-context span{color:#687d92;line-height:1.6}
      .jel-memory{margin-top:14px;padding:14px;border-radius:13px;background:#f4f8ff;border:1px solid #d9e7f8;color:#50677f;line-height:1.65}
      .jel-note{margin-top:10px;color:#6b7e93;font-size:13px}
      .jel-input{width:100%;min-height:125px;border:1px solid #ccd8e5;border-radius:14px;padding:13px;font:inherit;resize:vertical;margin-top:12px}
      .jel-feedback{margin-top:12px;padding:14px;border-radius:13px;border:1px solid #dfe7f0;line-height:1.65}
      .jel-correct{background:#f0fbf4;border-color:#bfe4cb}.jel-wrong{background:#fff4f2;border-color:#efc7c0}
      @media(max-width:700px){.jel-top{display:grid}.jel-grid{grid-template-columns:1fr}.jel-wrap{padding:16px 12px 40px}}
    `;
    document.head.appendChild(s);
  };

  const shell=(title,sub)=>`
    <div class="jel-wrap">
      <div class="jel-top">
        <div>
          <div class="jel-kicker">JNVST CLASS 9 · ENGLISH MASTERY</div>
          <div class="jel-title">${title}</div>
          <p class="jel-sub">${sub}</p>
        </div>
        <div class="jel-row">
          <a class="jel-btn" href="#/subjects/sub_eng">← English Hub</a>
        </div>
      </div>
      <div id="jel-content"></div>
    </div>
  `;

  const mount=()=>{
    const hash=location.hash||'';
    const route=hash.split('?')[0];
    const wanted=route.includes('/english-translation-practice')?'translation-practice':route.includes('/english-vocabulary-practice')?'vocabulary-practice':route.includes('/english-translation-lab')?'translation':route.includes('/english-vocabulary-lab')?'vocabulary':'';
    if(!wanted){
      const old=document.getElementById(OVERLAY);if(old)old.remove();return;
    }
    style();
    if(state.lab!==wanted){
      state.lab=wanted;state.mode=wanted.endsWith('-practice')?'practice':'learn';state.transIndex=0;state.vocabIndex=0;state.transSeen.clear();state.answer='';state.checked=false;
      if(wanted==='vocabulary')resetVocabulary();
    }
    let root=document.getElementById(OVERLAY);
    if(!root){root=document.createElement('div');root.id=OVERLAY;document.body.appendChild(root);}
    root.innerHTML=(wanted==='translation'||wanted==='translation-practice')
      ? shell(wanted==='translation-practice'?'Translation Practice Page':'Translation Learn + Practice',wanted==='translation-practice'?'अब केवल practice करें: sentence translate करें, hint लें और उत्तर check करें।':'पहले अलग-अलग sentence structures के real examples सीखें। फिर Practice में खुद translation करें। Learn stream session में exact sentence repeat नहीं करेगा।')
      : shell(wanted==='vocabulary-practice'?'Vocabulary Practice Page':'Vocabulary Learn + Practice',wanted==='vocabulary-practice'?'अब केवल practice करें: meaning, synonym, antonym और context questions solve करें।':'पहले word, हिन्दी meaning, synonyms, antonyms और context सीखें। Expanded bank के सभी unique words एक round में केवल एक बार आएँगे।');
    renderControls();
    wanted==='translation'?renderTranslationBody():renderVocabularyBody();
  };

  const renderControls=()=>{
    const c=document.getElementById('jel-content');
    const dedicatedPractice=state.lab.endsWith('-practice');
    const baseLab=state.lab==='translation-practice'?'translation':state.lab==='vocabulary-practice'?'vocabulary':state.lab;
    c.insertAdjacentHTML('afterbegin',`
      ${dedicatedPractice?'<div class="jel-card"><div class="jel-row"><a class="jel-btn" href="#/english-'+baseLab+'">← Learn & Examples</a><span class="jel-counter">DEDICATED PRACTICE PAGE</span></div></div>':'<div class="jel-tabs"><button class="jel-btn '+(state.mode==='learn'?'active':'')+'" data-jel="mode" data-val="learn">📖 Learn & Examples</button><button class="jel-btn '+(state.mode==='practice'?'active':'')+'" data-jel="mode" data-val="practice">🎯 Practice</button></div>'}
      ${baseLab==='translation'?'<div class="jel-card"><div class="jel-row"><button class="jel-btn '+(state.direction==='hi-en'?'active':'')+'" data-jel="dir" data-val="hi-en">Hindi → English</button><button class="jel-btn '+(state.direction==='en-hi'?'active':'')+'" data-jel="dir" data-val="en-hi">English → Hindi</button></div><div class="jel-levels"><button class="jel-level '+(state.level===0?'active':'')+'" data-jel="level" data-val="0"><b>All Levels</b><span>पूरी range</span></button>'+[1,2,3,4,5,6].map(l=>'<button class="jel-level '+(state.level===l?'active':'')+'" data-jel="level" data-val="'+l+'"><b>Level '+l+'</b><span>'+['Foundation','Everyday English','Grammar Builder','Mixed Grammar','Strong Sentence','Exam Bridge'][l-1]+'</span></button>').join('')+'</div></div>':'<div class="jel-card"><div class="jel-row">'+(dedicatedPractice?['meaning','reverse','synonym','antonym','context'].map(l=>'<button class="jel-btn" data-jel="vpractice" data-val="'+l+'">'+(l==='meaning'?'Word → Hindi':l==='reverse'?'Hindi → Word':l==='synonym'?'Synonym':l==='antonym'?'Antonym':'Context')+'</button>').join(''):'')+'<button class="jel-btn '+(state.level==='all'?'active':'')+'" data-jel="vlevel" data-val="all">All Levels · '+VOCAB.length+' words</button>'+['beginner','basic','intermediate','jnvst','challenge'].map(l=>'<button class="jel-btn '+(state.level===l?'active':'')+'" data-jel="vlevel" data-val="'+l+'">'+l+'</button>').join('')+'</div></div>'}
    `);
  };

  const renderTranslationBody=()=>{
    const wrap=document.getElementById('jel-content');
    const card=document.createElement('div');card.className='jel-card';
    const activeLevel=state.level===0?((state.transIndex%6)+1):state.level;
    if(!state.currentTrans || state.currentTrans.index!==state.transIndex || state.currentTrans.level!==activeLevel || state.currentTrans.direction!==state.direction){
      const generated=getTranslation(activeLevel,state.transIndex,state.direction);
      state.currentTrans={...generated,index:state.transIndex,level:activeLevel,direction:state.direction};
    }
    const item=state.currentTrans;
    if(state.mode==='learn'){
      card.innerHTML=`
        <div class="jel-counter">EXAMPLE ${state.transIndex+1} · ${state.level===0?'ALL LEVELS':'LEVEL '+activeLevel} · NO-REPEAT</div>
        <div class="jel-source"><small>${state.direction==='hi-en'?'Hindi sentence':'English sentence'}</small><h2>${esc(state.direction==='hi-en'?item.hi:item.en)}</h2></div>
        <div class="jel-answer"><small>${state.direction==='hi-en'?'Natural English':'Natural Hindi'}</small><h3>${esc(state.direction==='hi-en'?item.en:item.hi)}</h3>
          <div class="jel-grid"><div class="jel-mini"><b>Grammar structure</b><p>${esc(item.gp)}</p></div><div class="jel-mini"><b>क्यों?</b><p>${esc(item.ex)}</p></div></div>
          <div class="jel-steps"><b>Sentence बनाने के steps</b><ol>${item.steps.map(x=>'<li>'+esc(x)+'</li>').join('')}</ol></div>
        </div>
        <div class="jel-memory"><b>Remember:</b> पहले structure बोलें, फिर पूरा sentence बिना देखे दोहराएँ।</div>
        <div class="jel-row" style="margin-top:14px"><button class="jel-btn primary" data-jel="next-trans">अगला example →</button><a class="jel-btn" href="#/english-translation-practice">🎯 Practice Page</a></div>
      `;
    }else{
      card.innerHTML=`
        <div class="jel-counter">QUESTION ${state.transIndex+1} · ${state.level===0?'ALL LEVELS':'LEVEL '+activeLevel} · PRACTICE PAGE</div>
        <div class="jel-source"><small>${state.direction==='hi-en'?'इसका English translation लिखें':'इसका Hindi translation लिखें'}</small><h2>${esc(state.direction==='hi-en'?item.hi:item.en)}</h2></div>
        <textarea class="jel-input" id="jel-trans-answer" placeholder="अपना answer यहाँ लिखें…" ${state.checked?'disabled':''}>${esc(state.answer)}</textarea>
        <div class="jel-row" style="margin-top:12px">${state.checked?'<button class="jel-btn primary" data-jel="next-trans">अगला प्रश्न →</button>':'<button class="jel-btn" data-jel="hint">💡 Hint</button><button class="jel-btn primary" data-jel="check-trans">उत्तर जाँचें</button>'}</div>
        <div id="jel-trans-feedback">${state.checked?'<div class="jel-feedback jel-wrong"><b>सही उत्तर:</b><p>${esc(state.direction==='hi-en'?item.en:item.hi)}</p><p><b>Grammar:</b> ${esc(item.gp)}</p><p>${esc(item.ex)}</p></div>':''}</div>
      `;
      card.dataset.answer=item.en;card.dataset.hi=item.hi;card.dataset.gp=item.gp;card.dataset.ex=item.ex;card.dataset.hint=item.hint;
    }
    wrap.appendChild(card);
  };

  const renderVocabularyBody=()=>{
    const wrap=document.getElementById('jel-content');
    const card=document.createElement('div');card.className='jel-card';
    const chosen=state.level==='all'?VOCAB:VOCAB.filter(x=>x.level===state.level);
    if(!state.vocabOrder.length)state.vocabOrder=shuffle(chosen.map((_,i)=>i));
    const item=vocabItem();
    if(!item){card.innerHTML='<p>इस level में अभी words उपलब्ध नहीं हैं।</p>';wrap.appendChild(card);return;}
    if(state.mode==='learn'){
      card.innerHTML=`
        <div class="jel-counter">WORD ${state.vocabIndex+1} / ${chosen.length} · ROUND ${state.vocabRound} · NO-REPEAT</div>
        <div class="jel-word">${esc(item.word)}</div>
        <div class="jel-meaning">हिन्दी meaning: ${esc(item.meaning)}</div>
        <div class="jel-grid" style="margin-top:14px"><div class="jel-mini"><b>Synonyms</b><p>${esc(item.synonyms.length?item.synonyms.join(', '):'—')}</p></div><div class="jel-mini"><b>Antonyms</b><p>${esc(item.antonyms.length?item.antonyms.join(', '):'—')}</p></div></div>
        <div class="jel-context"><small>Fresh context example</small><p>${esc(vocabExample(item,state.vocabIndex+state.vocabRound))}</p><span>Context meaning: ${esc(item.meaning)}</span></div>
        <div class="jel-memory"><b>याद करने की 4-step method:</b> word पढ़ें → Hindi meaning बोलें → example में उपयोग देखें → बिना देखे meaning recall करें।</div>
        <div class="jel-row" style="margin-top:14px"><button class="jel-btn primary" data-jel="next-vocab">अगला word →</button><a class="jel-btn" href="#/english-vocabulary-practice">🎯 Practice Page</a></div>
      `;
    }else{
      const mode=state.vocabMode||'meaning';
      const getTarget=(m)=>{
        if(m==='meaning')return {prompt:item.word,target:item.meaning,kind:'meaning',label:'इस शब्द का हिन्दी अर्थ चुनें',pool:chosen.map(x=>x.meaning)};
        if(m==='reverse')return {prompt:item.meaning,target:item.word,kind:'word',label:'इस हिन्दी अर्थ के लिए सही English word चुनें',pool:chosen.map(x=>x.word)};
        if(m==='synonym')return {prompt:item.word,target:item.synonyms[0]||item.word,kind:'synonym',label:'सही synonym चुनें',pool:chosen.flatMap(x=>x.synonyms)};
        if(m==='antonym')return {prompt:item.word,target:item.antonyms[0]||'—',kind:'antonym',label:'सही antonym चुनें',pool:chosen.flatMap(x=>x.antonyms).filter(Boolean)};
        return {prompt:vocabExample(item,state.vocabIndex+state.vocabRound),target:item.meaning,kind:'context',label:'Sentence में दिए word का contextual meaning चुनें',pool:chosen.map(x=>x.meaning)};
      };
      const q=getTarget(mode);
      const pool=[q.target,...q.pool.filter(x=>x&&x!==q.target)];
      const opts=shuffle([...new Set(pool)],state.vocabIndex*1009+state.vocabRound*97).slice(0,4);
      card.innerHTML=`
        <div class="jel-counter">QUESTION ${state.vocabIndex+1} · 4 OPTIONS · ${mode.toUpperCase()} · NO-REPEAT</div>
        <div class="jel-source"><small>${q.label}</small><h2>${esc(q.prompt)}</h2></div>
        <div class="jel-row" style="margin-top:12px">${opts.map(o=>'<button class="jel-btn '+(state.vocabSelected===o?'active':'')+'" data-jel="vopt" data-val="'+esc(o)+'">'+esc(o)+'</button>').join('')}</div>
        <div class="jel-row" style="margin-top:12px">${state.vocabChecked?'<button class="jel-btn primary" data-jel="next-vocab">अगला प्रश्न →</button>':'<button class="jel-btn primary" data-jel="check-vocab" '+(state.vocabSelected?'':'disabled')+'>उत्तर जाँचें</button>'}</div>
        <div id="jel-v-feedback">${state.vocabChecked?'<div class="jel-feedback '+(norm(state.vocabSelected)===norm(q.target)?'jel-correct':'jel-wrong')+'"><b>'+(norm(state.vocabSelected)===norm(q.target)?'✓ सही':'अभी सही नहीं')+'</b><p><b>सही उत्तर:</b> '+esc(q.target)+'</p><p>Example context में answer का प्रयोग पहचानना सीखें.</p></div>':''}</div>
      `;
      card.dataset.correct=q.target;card.dataset.prompt=q.prompt;
    }
    wrap.appendChild(card);
  };

  document.addEventListener('click',e=>{
    const el=e.target.closest&&e.target.closest('[data-jel]');if(!el)return;
    const act=el.dataset.jel;
    if(act==='mode'){state.mode=el.dataset.val;state.answer='';state.checked=false;state.vocabSelected='';state.vocabChecked=false;mount();return;}
    if(act==='dir'){state.direction=el.dataset.val;state.transIndex=0;state.transSeen.clear();state.currentTrans=null;state.answer='';state.checked=false;mount();return;}
    if(act==='level'){state.level=Number(el.dataset.val);state.transIndex=0;state.transSeen.clear();state.currentTrans=null;state.answer='';state.checked=false;mount();return;}
    if(act==='vlevel'){state.level=el.dataset.val;resetVocabulary();state.vocabSelected='';state.vocabChecked=false;mount();return;}
    if(act==='vpractice'){state.vocabMode=el.dataset.val;state.vocabSelected='';state.vocabChecked=false;mount();return;}
    if(act==='next-trans'){state.transIndex++;state.currentTrans=null;state.answer='';state.checked=false;mount();return;}
    if(act==='next-vocab'){state.vocabIndex++;state.vocabSelected='';state.vocabChecked=false;mount();return;}
    if(act==='hint'){const card=el.closest('.jel-card');card.querySelector('#jel-trans-feedback').innerHTML='<div class="jel-feedback">💡 '+esc(card.dataset.hint)+'</div>';return;}
    if(act==='check-trans'){
      const card=el.closest('.jel-card');const input=card.querySelector('#jel-trans-answer');state.answer=input.value;
      const answer=state.direction==='hi-en'?card.dataset.answer:card.dataset.hi;
      const ok=norm(input.value)===norm(answer);
      state.checked=true;
      card.querySelector('#jel-trans-feedback').innerHTML='<div class="jel-feedback '+(ok?'jel-correct':'jel-wrong')+'"><b>'+(ok?'✓ सही':'अभी सही नहीं')+'</b><p><b>सही उत्तर:</b> '+esc(answer)+'</p><p><b>Grammar:</b> '+esc(card.dataset.gp)+'</p><p>'+esc(card.dataset.ex)+'</p></div><div class="jel-row" style="margin-top:10px"><button class="jel-btn primary" data-jel="next-trans">अगला प्रश्न →</button></div>';
      card.querySelector('#jel-trans-answer').disabled=true;
      el.disabled=true;
      return;
    }
    if(act==='vopt'&&!state.vocabChecked){
      const card=el.closest('.jel-card');state.vocabSelected=el.dataset.val;card.querySelectorAll('[data-jel="vopt"]').forEach(x=>x.classList.remove('active'));el.classList.add('active');return;
    }
    if(act==='check-vocab'){
      const card=el.closest('.jel-card');state.vocabChecked=true;
      const ok=norm(state.vocabSelected)===norm(card.dataset.correct);
      card.querySelector('#jel-v-feedback').innerHTML='<div class="jel-feedback '+(ok?'jel-correct':'jel-wrong')+'"><b>'+(ok?'✓ सही':'अभी सही नहीं')+'</b><p><b>सही उत्तर:</b> '+esc(card.dataset.correct)+'</p><p>Example context में इसी meaning को पहचानना सीखें।</p></div>';
      card.querySelectorAll('[data-jel="vopt"]').forEach(x=>x.disabled=true);
      el.disabled=true;
      const row=card.querySelector('[data-jel="check-vocab"]')?.parentElement;if(row)row.innerHTML='<button class="jel-btn primary" data-jel="next-vocab">अगला प्रश्न →</button>';
      return;
    }
  },true);

  const observe=()=>{
    if(!document.body)return;
    const obs=new MutationObserver(()=>{const h=location.hash||'';if((h.includes('/english-translation-lab')||h.includes('/english-vocabulary-lab'))&&!document.getElementById(OVERLAY))mount();});
    obs.observe(document.body,{childList:true,subtree:true});
  };
  style();
  window.addEventListener('hashchange',mount);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{observe();mount();});else{observe();mount();}
})();