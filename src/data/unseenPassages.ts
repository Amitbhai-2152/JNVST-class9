export interface UnseenPassageQuestion {
  id: string;
  skill: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export interface UnseenPassage {
  id: string;
  title: string;
  level: "Beginner" | "Basic" | "JNVST" | "Challenge";
  passage: string;
  questions: UnseenPassageQuestion[];
}

export const unseenPassages: UnseenPassage[] = [
  {
    id: "up-01",
    title: "The Library on Wheels",
    level: "Beginner",
    passage: "A small library in Meera's town started a new service. Every Saturday, a van filled with books visited nearby villages. Children could borrow two books and return them the following week. At first, only a few children came. Soon, parents noticed that their children were spending more time reading, and the number of readers increased. The librarian also began keeping storybooks, science books and simple dictionaries in the van so that children with different interests could find something useful.",
    questions: [
      { id: "up-01-q1", skill: "Main Idea", question: "What is the passage mainly about?", options: ["A new mobile library service helping village children read", "A van used for travelling to a town market", "Parents buying books for their children", "A competition between village schools"], correctIndex: 0, hint: "Look for the idea that covers the whole passage.", explanation: "The whole passage explains how a book-filled van visits villages and increases children's access to reading. The other options mention only small details or ideas not stated." },
      { id: "up-01-q2", skill: "Direct Fact", question: "How many books could a child borrow?", options: ["One", "Two", "Three", "Four"], correctIndex: 1, hint: "Find the exact number in the second sentence.", explanation: "The passage directly says that children could borrow two books and return them the following week." },
      { id: "up-01-q3", skill: "Inference", question: "Why did the number of readers increase?", options: ["The van started selling snacks.", "Parents stopped children from playing outside.", "Children got easier access to books and began reading more.", "The villages received new school buildings."], correctIndex: 2, hint: "Connect the library visits with the result mentioned later.", explanation: "The passage connects the new service with children spending more time reading. Easier access to books is the evidence-based reason." },
      { id: "up-01-q4", skill: "Vocabulary in Context", question: "What does 'borrow' mean in the passage?", options: ["Take something temporarily and return it", "Buy something permanently", "Hide something from others", "Throw something away"], correctIndex: 0, hint: "Look at what children did with the books the following week.", explanation: "Because the children returned the books the following week, 'borrow' means taking something temporarily with the intention of returning it." },
      { id: "up-01-q5", skill: "Purpose", question: "Why were different kinds of books kept in the van?", options: ["To make the van heavier", "To serve children with different interests", "To stop children from borrowing books", "To help the librarian decorate the van"], correctIndex: 1, hint: "The last sentence gives the purpose.", explanation: "The librarian added storybooks, science books and dictionaries so children with different interests could find useful reading material." }
    ]
  },
  {
    id: "up-02",
    title: "Saving Rainwater",
    level: "Basic",
    passage: "During a summer with little rainfall, the students of Green Valley School noticed that a large amount of rainwater was flowing away from the school roof. Their science teacher suggested collecting it in a storage tank. The students helped clean the roof, fixed a pipe and connected it to the tank. The stored water was later used for watering plants and cleaning the school garden. The project did not solve every water problem, but it taught the students that a small change in daily practice could save a useful resource.",
    questions: [
      { id: "up-02-q1", skill: "Problem", question: "What problem did the students notice?", options: ["The school had too many plants.", "Rainwater from the roof was being wasted.", "The storage tank was too large.", "The garden had too many flowers."], correctIndex: 1, hint: "Find what was happening to the water from the roof.", explanation: "The passage says that a large amount of rainwater was flowing away from the school roof, so it was being wasted rather than collected." },
      { id: "up-02-q2", skill: "Sequence", question: "What did the students do after cleaning the roof?", options: ["They used the water to cook food.", "They removed the storage tank.", "They fixed a pipe.", "They planted trees outside the school."], correctIndex: 2, hint: "Follow the actions in order.", explanation: "The sequence is: clean the roof → fix a pipe → connect it to the tank → use the stored water." },
      { id: "up-02-q3", skill: "Inference", question: "What lesson did the project teach the students?", options: ["Only large projects can save water.", "Small practical actions can help conserve resources.", "Rainwater should never be stored.", "School gardens do not need water."], correctIndex: 1, hint: "Look at the final sentence.", explanation: "The final sentence directly gives the lesson: a small change in daily practice can save a useful resource." },
      { id: "up-02-q4", skill: "Vocabulary in Context", question: "What does 'resource' mean here?", options: ["Something useful that can be used", "A classroom rule", "A type of pipe", "A school examination"], correctIndex: 0, hint: "Think about water being valuable and useful.", explanation: "Water is being discussed as something valuable and useful that should not be wasted; that is a resource." },
      { id: "up-02-q5", skill: "Title", question: "Choose the most suitable title.", options: ["A Broken School Roof", "The School Garden Competition", "Saving Rainwater at School", "A Summer Holiday"], correctIndex: 2, hint: "The title should cover the central activity.", explanation: "The passage focuses on collecting and using rainwater at school, so 'Saving Rainwater at School' covers the whole passage." }
    ]
  },
  {
    id: "up-03",
    title: "The Repair Shop",
    level: "Basic",
    passage: "Every evening, an old bicycle repair shop near the market became a busy place. Ravi, the owner, could repair tyres, chains and brakes. One afternoon, a boy arrived with a bicycle whose chain had come off. Ravi showed him how the chain fitted around the gears and allowed him to put it back himself. The boy was happy because he had not only got his bicycle working again but had also learned a useful skill. Ravi believed that teaching a customer was sometimes more valuable than simply doing the work for him.",
    questions: [
      { id: "up-03-q1", skill: "Direct Fact", question: "What problem did the boy have?", options: ["A flat tyre", "A broken seat", "A loose handle", "A chain that had come off"], correctIndex: 3, hint: "Read the sentence describing the boy's bicycle.", explanation: "The passage clearly says that the bicycle's chain had come off." },
      { id: "up-03-q2", skill: "Inference", question: "Why was the boy especially happy?", options: ["He received a new bicycle.", "He learned how to fix the chain himself.", "Ravi gave him money.", "The shop closed early."], correctIndex: 1, hint: "Look for the two benefits mentioned after the repair.", explanation: "The boy was happy because the bicycle worked again and he learned a useful repair skill." },
      { id: "up-03-q3", skill: "Vocabulary in Context", question: "What does 'valuable' mean in the final sentence?", options: ["Worthless", "Very expensive only", "Important or useful", "Difficult to understand"], correctIndex: 2, hint: "Compare teaching with simply doing the job.", explanation: "Ravi considers teaching a useful skill more valuable in the sense of more important or useful to the customer." },
      { id: "up-03-q4", skill: "Author's Idea", question: "What did Ravi believe?", options: ["Customers should never touch bicycles.", "Teaching people can sometimes be more useful than only doing a job for them.", "Repair shops should open only in the morning.", "Children cannot learn repair work."], correctIndex: 1, hint: "The final sentence states his belief.", explanation: "The final sentence is the strongest evidence: Ravi believed teaching a customer could be more valuable than simply doing the work." },
      { id: "up-03-q5", skill: "Title", question: "Which title best fits the passage?", options: ["Learning While Repairing", "The Market Festival", "A New Bicycle Race", "The Lost Brake"], correctIndex: 0, hint: "The story is about a repair and a lesson learned.", explanation: "'Learning While Repairing' captures both the bicycle repair and the useful skill Ravi taught the boy." }
    ]
  },
  {
    id: "up-04",
    title: "The Clay Lamp",
    level: "JNVST",
    passage: "Before the festival, Nita visited a potter's workshop with her grandmother. Rows of small clay lamps were drying in the sunlight. Nita watched the potter shape wet clay with his hands and place each lamp carefully on a wooden board. She noticed that no two lamps looked exactly the same. The potter explained that small differences were natural because each lamp was made by hand. Nita bought four lamps and decided to place them near the entrance of her house. She returned home thinking about how patient work could turn a simple lump of clay into something useful and beautiful.",
    questions: [
      { id: "up-04-q1", skill: "Observation", question: "Where were the clay lamps drying?", options: ["Inside a metal box", "In the sunlight", "Under the kitchen table", "Near a river"], correctIndex: 1, hint: "The second sentence tells you.", explanation: "The passage says that rows of lamps were drying in the sunlight." },
      { id: "up-04-q2", skill: "Inference", question: "Why did no two lamps look exactly the same?", options: ["The lamps were made by different machines.", "The potter used broken tools.", "Each lamp was handmade, so small differences were natural.", "The lamps had been painted by children."], correctIndex: 2, hint: "Use the potter's explanation.", explanation: "The potter explains that each lamp was made by hand, which naturally creates small differences." },
      { id: "up-04-q3", skill: "Meaning in Context", question: "What does 'lump' mean in 'a simple lump of clay'?", options: ["A shaped piece of clay", "A festival song", "A finished lamp", "A wooden board"], correctIndex: 0, hint: "Think of clay before it is shaped.", explanation: "A 'lump' is an unshaped mass or piece of material. Here it is clay before the potter gives it a lamp shape." },
      { id: "up-04-q4", skill: "Main Idea", question: "What impressed Nita most?", options: ["The workshop's location", "The speed of the potter", "How patient handmade work created useful beauty", "The number of visitors"], correctIndex: 2, hint: "Look at what she was thinking when she went home.", explanation: "The final sentence shows what stayed in Nita's mind: patient work can transform simple clay into something useful and beautiful." },
      { id: "up-04-q5", skill: "Sequence", question: "What did Nita do after watching the potter shape the clay?", options: ["She returned home immediately.", "She bought four lamps.", "She closed the workshop.", "She painted the lamps."], correctIndex: 1, hint: "Compare the middle and final actions.", explanation: "She first watched the potter, noticed the handmade differences, heard his explanation, and then bought four lamps." }
    ]
  },
  {
    id: "up-05",
    title: "The School Garden",
    level: "JNVST",
    passage: "A dry corner behind Sunrise School was once covered with stones and weeds. The eco-club decided to change it into a small learning garden. Students removed the weeds, added soil and planted vegetables, herbs and flowering plants. Instead of giving the work to only one group, the club made a weekly schedule so that different classes could care for the garden. After several weeks, teachers began using the garden during science lessons. Students could observe leaves, flowers, insects and changes in plant growth without leaving the school campus.",
    questions: [
      { id: "up-05-q1", skill: "Main Idea", question: "What is the passage mainly about?", options: ["A sports competition", "Turning an unused school corner into a learning garden", "Building a new classroom", "Buying vegetables from a market"], correctIndex: 1, hint: "What change happened to the dry corner?", explanation: "The central idea is the transformation of an unused corner into a garden that later became useful for science learning." },
      { id: "up-05-q2", skill: "Purpose", question: "Why did the club create a weekly schedule?", options: ["To make the garden look larger", "To allow different classes to share responsibility", "To stop students from visiting the garden", "To reduce the number of plants"], correctIndex: 1, hint: "Notice the sentence beginning 'Instead of...'.", explanation: "The schedule allowed different classes to care for the garden instead of leaving the work to one group." },
      { id: "up-05-q3", skill: "Inference", question: "How did the garden help science lessons?", options: ["It replaced science teachers.", "It gave students real things to observe on campus.", "It removed all insects from the school.", "It made lessons shorter by skipping experiments."], correctIndex: 1, hint: "Look at the last sentence.", explanation: "Students could directly observe leaves, flowers, insects and plant growth, giving them real examples during science lessons." },
      { id: "up-05-q4", skill: "Vocabulary in Context", question: "What does 'campus' refer to here?", options: ["The school grounds", "A vegetable shop", "A science book", "A classroom desk"], correctIndex: 0, hint: "The students did not have to leave where?", explanation: "Because the garden was inside the school area, 'campus' means the school grounds." },
      { id: "up-05-q5", skill: "Direct Fact", question: "Which of these was planted in the garden?", options: ["Only trees", "Vegetables, herbs and flowering plants", "Only grass", "Only wheat"], correctIndex: 1, hint: "Find the exact list in the passage.", explanation: "The passage directly lists vegetables, herbs and flowering plants." }
    ]
  },
  {
    id: "up-06",
    title: "The Lost Key",
    level: "JNVST",
    passage: "When Aman reached the school gate one morning, he noticed that the key to the storeroom was missing from the hook where it was usually kept. He searched the office table and the nearby shelves but could not find it. Instead of blaming someone, he remembered that the sports teacher had used the storeroom the previous afternoon. Aman checked the sports room and found the key inside a small box. He returned it to the office and told the teacher where he had found it. The key had not been lost at all; it had simply been placed somewhere different for a short time.",
    questions: [
      { id: "up-06-q1", skill: "Problem", question: "What was missing from the usual place?", options: ["A school book", "A sports whistle", "A storeroom key", "A classroom register"], correctIndex: 2, hint: "Read the first sentence carefully.", explanation: "The missing item was the key to the storeroom." },
      { id: "up-06-q2", skill: "Inference", question: "What can we infer about Aman?", options: ["He acted calmly and looked for evidence.", "He refused to help anyone.", "He immediately blamed the sports teacher.", "He left the school without searching."], correctIndex: 0, hint: "Notice what Aman did before making a conclusion.", explanation: "Aman searched several places, remembered a useful clue, checked the sports room and found the key. His actions show calm, evidence-based problem solving." },
      { id: "up-06-q3", skill: "Reference", question: "What does 'it' refer to in 'He returned it to the office'?", options: ["The sports room", "The key", "The small box", "The office table"], correctIndex: 1, hint: "What had Aman found?", explanation: "Aman had found the key inside the box, so the pronoun 'it' refers to the key." },
      { id: "up-06-q4", skill: "Vocabulary in Context", question: "What does 'blaming' mean in the passage?", options: ["Saying someone is responsible for a problem", "Helping someone repair a door", "Writing a school notice", "Moving an object carefully"], correctIndex: 0, hint: "Think about what Aman chose not to do.", explanation: "Aman did not accuse anyone of causing the missing-key problem. 'Blaming' means saying that someone is responsible for a problem." },
      { id: "up-06-q5", skill: "Main Conclusion", question: "What was the real situation with the key?", options: ["It was stolen.", "It was broken.", "It had been thrown away.", "It had been placed in a different location temporarily."], correctIndex: 3, hint: "The final sentence gives the conclusion.", explanation: "The final sentence directly explains that the key had not been lost; it had simply been kept somewhere different for a short time." }
    ]
  },
  {
    id: "up-07",
    title: "Watching the Night Sky",
    level: "Challenge",
    passage: "On a clear winter evening, Tara carried a notebook to the terrace and looked at the night sky. Her uncle had told her that the position of some stars seemed to change during the year because Earth moves around the Sun. Tara marked a few bright stars and wrote down the date and time. She repeated the observation on several evenings. She did not expect to understand everything immediately, but she wanted to compare her notes later. After a week, she noticed that careful observation made the sky seem less mysterious and more understandable.",
    questions: [
      { id: "up-07-q1", skill: "Main Idea", question: "What is the passage mainly showing?", options: ["Stars can be moved by hand.", "Careful observation can help us understand patterns in nature.", "Winter evenings are always cloudy.", "Tara wanted to avoid science."], correctIndex: 1, hint: "Look at what Tara learns from repeated observation.", explanation: "The passage focuses on observing the sky carefully, recording evidence and using comparison to make a natural pattern easier to understand." },
      { id: "up-07-q2", skill: "Reason", question: "Why did Tara record the date and time?", options: ["To decorate her notebook", "To compare observations made at different times", "To remember her uncle's phone number", "To calculate the price of a telescope"], correctIndex: 1, hint: "What did she plan to do with her notes later?", explanation: "She wanted to compare her notes later, so recording the date and time would help her compare observations accurately." },
      { id: "up-07-q3", skill: "Vocabulary in Context", question: "What does 'mysterious' mean in the final sentence?", options: ["Easy to measure", "Not fully understood or explained", "Very bright", "Located near the terrace"], correctIndex: 1, hint: "Compare 'less mysterious' with 'more understandable'.", explanation: "The phrase 'less mysterious and more understandable' shows that mysterious means something not fully understood or explained." },
      { id: "up-07-q4", skill: "Inference", question: "What quality did Tara show?", options: ["Patience and curiosity", "Carelessness", "Fear of learning", "Impatience with science"], correctIndex: 0, hint: "She repeated the observation and accepted that learning takes time.", explanation: "Tara continued observing, recorded notes and did not expect immediate understanding. This shows curiosity and patience." },
      { id: "up-07-q5", skill: "Purpose", question: "Why did the author mention that Tara 'did not expect to understand everything immediately'?", options: ["To show that careful learning can take time", "To show that she disliked the sky", "To prove that notebooks are unnecessary", "To explain why she left the terrace"], correctIndex: 0, hint: "Connect this sentence with her repeated observations.", explanation: "The sentence emphasizes a learning attitude: understanding can grow through repeated observation rather than arriving instantly." }
    ]
  },
  {
    id: "up-08",
    title: "The Seed Exchange",
    level: "Challenge",
    passage: "A group of farmers in a nearby village started a seed exchange before the planting season. Each farmer brought a small quantity of seeds from crops that had grown well on his or her land. They labelled the packets with the crop name and collected them in a common room. A farmer who wanted to try a different crop could take a packet and later return some seeds from the next harvest. The group did not charge money for the exchange. Their aim was to share useful varieties and reduce dependence on buying every type of seed from outside.",
    questions: [
      { id: "up-08-q1", skill: "Main Idea", question: "What is the main purpose of the seed exchange?", options: ["To sell expensive farm tools", "To share useful seed varieties among farmers", "To close village farms", "To stop farmers from trying new crops"], correctIndex: 1, hint: "Look at the last sentence.", explanation: "The group created the exchange to share useful crop varieties and reduce dependence on buying every seed from outside." },
      { id: "up-08-q2", skill: "Sequence", question: "What could a farmer do after taking a packet of seeds?", options: ["Keep the packet forever without growing anything", "Return some seeds from the next harvest", "Throw away the packet", "Sell the common room"], correctIndex: 1, hint: "The third and fourth sentences explain the process.", explanation: "A farmer could take a packet to try a crop and later return some seeds from the next harvest." },
      { id: "up-08-q3", skill: "Vocabulary in Context", question: "What does 'dependence' mean in the final sentence?", options: ["The need to rely on something", "A type of farming machine", "A method of labelling packets", "A place where crops are stored"], correctIndex: 0, hint: "Think about reducing the need to buy seeds from outside.", explanation: "Dependence means relying on something. The farmers wanted to reduce their need to rely on outside seed purchases." },
      { id: "up-08-q4", skill: "Inference", question: "What value does the seed exchange encourage?", options: ["Competition without cooperation", "Sharing and cooperation", "Wasting seeds", "Avoiding all new crops"], correctIndex: 1, hint: "Farmers contribute and later return seeds.", explanation: "The exchange works because farmers share seeds and return part of a later harvest, so cooperation is central to the system." },
      { id: "up-08-q5", skill: "Direct Fact", question: "How were the seed packets identified?", options: ["By colour only", "With the farmer's photograph", "With the crop name", "With a market price"], correctIndex: 2, hint: "Find the word used with 'labelled'.", explanation: "The packets were labelled with the crop name so farmers could identify their contents." }
    ]
  },
  {
    id: "up-09",
    title: "The Quiet Corner",
    level: "JNVST",
    passage: "Riya often found it difficult to study in the evening because the television in the next room was loud. Instead of complaining every day, she looked for a practical solution. She noticed that the corner near the staircase remained quiet after dinner. She moved a small table there, kept only the books she needed and began studying in that space. Her concentration improved. Later, she also made a simple rule for herself: during study time, the phone stayed in another room. Riya discovered that changing her surroundings and removing distractions could make study easier.",
    questions: [
      { id: "up-09-q1", skill: "Problem and Solution", question: "What was Riya's main problem?", options: ["She had no books.", "The television made it difficult to study.", "She disliked the staircase.", "Her table was too large."], correctIndex: 1, hint: "The first sentence gives the problem.", explanation: "The loud television in the next room made it difficult for Riya to study in the evening." },
      { id: "up-09-q2", skill: "Solution", question: "What did Riya do first to improve her study environment?", options: ["She bought a television.", "She moved to a quieter corner.", "She stopped studying.", "She invited friends to the room."], correctIndex: 1, hint: "Look at what she found near the staircase.", explanation: "She noticed a quiet corner near the staircase and moved a small table there." },
      { id: "up-09-q3", skill: "Inference", question: "Why did Riya keep the phone in another room?", options: ["To make the phone louder", "To remove another distraction", "To charge it faster", "To lend it to a friend"], correctIndex: 1, hint: "What is the passage's final idea about distractions?", explanation: "The final sentence says that removing distractions made study easier. Keeping the phone elsewhere reduced another possible distraction." },
      { id: "up-09-q4", skill: "Vocabulary in Context", question: "What does 'concentration' mean here?", options: ["Focused attention", "Physical exercise", "A loud sound", "A school holiday"], correctIndex: 0, hint: "What improved when the environment became quieter?", explanation: "Concentration means the ability to focus attention on the task. The passage says her concentration improved after moving to a quiet space." },
      { id: "up-09-q5", skill: "Title", question: "Which title is most suitable?", options: ["Making Study Easier by Removing Distractions", "The Staircase Competition", "A New Television Show", "Riya's Evening Game"], correctIndex: 0, hint: "The title should capture both the problem and the solution.", explanation: "The passage is about changing the study environment and removing distractions, so the first title represents the whole idea." }
    ]
  },
  {
    id: "up-10",
    title: "The Village Bridge",
    level: "Challenge",
    passage: "For years, students from two parts of a village had to take a long route to reach school because a small stream separated their neighbourhoods. During the rainy season, the stream became wider, making the journey even slower. The village council finally approved a simple footbridge. Workers built it slightly above the highest usual water level and added side rails for safety. After the bridge opened, students reached school more quickly, but the change helped others too. Farmers, shopkeepers and older residents could also cross the stream more easily.",
    questions: [
      { id: "up-10-q1", skill: "Main Idea", question: "What change did the new bridge bring?", options: ["It closed the school.", "It made crossing the stream easier for many villagers.", "It stopped the rainy season.", "It replaced all village roads."], correctIndex: 1, hint: "Look at the effects after the bridge opened.", explanation: "The bridge shortened the school journey and also helped farmers, shopkeepers and older residents cross more easily." },
      { id: "up-10-q2", skill: "Reason", question: "Why was the bridge built above the highest usual water level?", options: ["To make it harder to cross", "To reduce the effect of rising water", "To stop people using the bridge", "To make it look taller"], correctIndex: 1, hint: "Connect the design with the rainy-season problem.", explanation: "The stream became wider during the rainy season. Building the bridge above the usual high-water level was a practical safety measure." },
      { id: "up-10-q3", skill: "Direct Fact", question: "Who else benefited from the bridge besides students?", options: ["Only teachers", "Farmers, shopkeepers and older residents", "Only construction workers", "Only tourists"], correctIndex: 1, hint: "The final sentence lists three groups.", explanation: "The passage directly names farmers, shopkeepers and older residents as additional beneficiaries." },
      { id: "up-10-q4", skill: "Vocabulary in Context", question: "What does 'separated' mean in the passage?", options: ["Joined closely", "Kept apart", "Painted brightly", "Moved together"], correctIndex: 1, hint: "The stream was between the two neighbourhoods.", explanation: "The stream kept the two neighbourhoods apart, so 'separated' means kept apart." },
      { id: "up-10-q5", skill: "Inference", question: "What can we infer about the bridge design?", options: ["It was planned only for appearance.", "It included practical safety features.", "It was built without considering water levels.", "It could be used only by farmers."], correctIndex: 1, hint: "Notice the water-level decision and side rails.", explanation: "The bridge was built above the usual water level and had side rails, showing that practical safety was considered in the design." }
    ]
  }
];
