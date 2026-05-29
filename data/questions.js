// Question bank configuration file.
// Edit the questions below to customize the quiz content.
// Keep the field names unchanged so the app can read them correctly.
window.BIBLE_QUESTION_CONFIG = {
  version: 1,
  questions: [
  {
    id: "gen-ark",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "简单", en: "Easy" },
    book: { zh: "创世记", en: "Genesis" },
    prompt: {
      zh: "洪水来到地上以前，是谁建造了方舟？",
      en: "Who built the ark before the flood came on the earth?",
    },
    options: [
      { zh: "摩西", en: "Moses" },
      { zh: "挪亚", en: "Noah" },
      { zh: "亚伯拉罕", en: "Abraham" },
      { zh: "大卫", en: "David" },
    ],
    answerIndex: 1,
    reference: "Genesis 6:13-22",
    scripture: {
      zh: "神吩咐挪亚用歌斐木造方舟，分一间一间地造，并把家人和各样活物带进去。",
      en: "God told Noah to build an ark of cypress wood, make rooms in it, and bring his family and living creatures inside.",
    },
    explanation: {
      zh: "神吩咐挪亚建造方舟，好在洪水来临时保全他的家人和各种活物。",
      en: "God instructed Noah to build the ark to preserve his family and the animals during the flood.",
    },
  },
  {
    id: "gen-ladder",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "中等", en: "Medium" },
    book: { zh: "创世记", en: "Genesis" },
    prompt: {
      zh: "哪一位族长曾梦见一个通到天上的梯子？",
      en: "Which patriarch dreamed of a ladder reaching up to heaven?",
    },
    options: [
      { zh: "以撒", en: "Isaac" },
      { zh: "约瑟", en: "Joseph" },
      { zh: "雅各", en: "Jacob" },
      { zh: "以扫", en: "Esau" },
    ],
    answerIndex: 2,
    reference: "Genesis 28:10-19",
    scripture: {
      zh: "雅各梦见一个梯子立在地上，梯子的头顶着天，神的使者在梯子上上去下来。",
      en: "Jacob dreamed of a ladder set up on the earth with its top reaching heaven, and the angels of God were ascending and descending on it.",
    },
    explanation: {
      zh: "雅各前往哈兰途中梦见天梯，并在梦中听见神向他重申应许。",
      en: "Jacob saw a ladder stretching to heaven and heard God's promise while traveling to Haran.",
    },
  },
  {
    id: "gen-joseph",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "中等", en: "Medium" },
    book: { zh: "创世记", en: "Genesis" },
    prompt: {
      zh: "在埃及饥荒来临之前，是谁为法老解梦？",
      en: "Who interpreted Pharaoh's dreams during the years of famine in Egypt?",
    },
    options: [
      { zh: "亚伦", en: "Aaron" },
      { zh: "约瑟", en: "Joseph" },
      { zh: "便雅悯", en: "Benjamin" },
      { zh: "撒母耳", en: "Samuel" },
    ],
    answerIndex: 1,
    reference: "Genesis 41:14-36",
    scripture: {
      zh: "约瑟告诉法老，七只肥牛和七个好穗子代表七个丰年，之后要有七个荒年。",
      en: "Joseph told Pharaoh that the seven fat cows and the seven good ears meant seven years of plenty, to be followed by seven years of famine.",
    },
    explanation: {
      zh: "约瑟说明法老的梦预示着七个丰年之后会接着七个荒年。",
      en: "Joseph explained that the dreams pointed to seven years of plenty followed by seven years of famine.",
    },
  },
  {
    id: "exo-light",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "简单", en: "Easy" },
    book: { zh: "创世记", en: "Genesis" },
    prompt: {
      zh: "神在第一日创造了什么？",
      en: "What did God create on the first day?",
    },
    options: [
      { zh: "动物", en: "Animals" },
      { zh: "光", en: "Light" },
      { zh: "太阳", en: "The sun" },
      { zh: "海里的活物", en: "Sea creatures" },
    ],
    answerIndex: 1,
    reference: "Genesis 1:3-5",
    scripture: {
      zh: "神说，要有光，就有了光；神看光是好的，就把光暗分开了。",
      en: "God said, 'Let there be light,' and there was light; God saw that the light was good and separated it from the darkness.",
    },
    explanation: {
      zh: "第一日，神说“要有光”，于是光就出现，并与暗分开。",
      en: "On the first day God said, 'Let there be light,' separating light from darkness.",
    },
  },
  {
    id: "exo-manna",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "简单", en: "Easy" },
    book: { zh: "出埃及记", en: "Exodus" },
    prompt: {
      zh: "神在旷野赐给以色列人的食物叫什么？",
      en: "What food did God provide for Israel in the wilderness?",
    },
    options: [
      { zh: "只有鹌鹑", en: "Quail only" },
      { zh: "吗哪", en: "Manna" },
      { zh: "饼和蜜", en: "Bread and honey" },
      { zh: "椰枣", en: "Dates" },
    ],
    answerIndex: 1,
    reference: "Exodus 16:13-15",
    scripture: {
      zh: "到了早晨，营四围的地上有细小圆白的东西；摩西说，这就是耶和华给你们吃的食物。",
      en: "In the morning a fine white thing lay on the ground around the camp, and Moses said, 'This is the bread the Lord has given you to eat.'",
    },
    explanation: {
      zh: "神从天降下吗哪，作为以色列人在旷野中的日常供应。",
      en: "God sent manna from heaven as daily provision for the Israelites in the wilderness.",
    },
  },
  {
    id: "exo-sinai",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "中等", en: "Medium" },
    book: { zh: "出埃及记", en: "Exodus" },
    prompt: {
      zh: "摩西是在什么山上领受十诫的？",
      en: "On what mountain did Moses receive the Ten Commandments?",
    },
    options: [
      { zh: "迦密山", en: "Mount Carmel" },
      { zh: "黑门山", en: "Mount Hermon" },
      { zh: "西奈山", en: "Mount Sinai" },
      { zh: "锡安山", en: "Mount Zion" },
    ],
    answerIndex: 2,
    reference: "Exodus 19:20; 20:1-17",
    scripture: {
      zh: "耶和华降临在西奈山顶，向百姓说话，并赐下诫命。",
      en: "The Lord came down on the top of Mount Sinai, spoke to the people, and gave his commandments.",
    },
    explanation: {
      zh: "摩西上西奈山，神在那里向以色列人颁布诫命。",
      en: "Moses went up Mount Sinai, where God gave the commandments to Israel.",
    },
  },
  {
    id: "joshua-leader",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "简单", en: "Easy" },
    book: { zh: "约书亚记", en: "Joshua" },
    prompt: {
      zh: "摩西死后，谁带领以色列人继续前行？",
      en: "Who led the Israelites after Moses died?",
    },
    options: [
      { zh: "亚伦", en: "Aaron" },
      { zh: "约书亚", en: "Joshua" },
      { zh: "迦勒", en: "Caleb" },
      { zh: "基甸", en: "Gideon" },
    ],
    answerIndex: 1,
    reference: "Joshua 1:1-2",
    scripture: {
      zh: "耶和华对约书亚说，我的仆人摩西死了；现在你要起来，带这百姓过约旦河。",
      en: "The Lord said to Joshua, 'Moses my servant is dead. Now arise and go over this Jordan, you and all this people.'",
    },
    explanation: {
      zh: "神拣选约书亚，在摩西死后带领以色列人进入应许之地。",
      en: "God appointed Joshua to lead Israel into the land after the death of Moses.",
    },
  },
  {
    id: "samuel-saul",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "中等", en: "Medium" },
    book: { zh: "撒母耳记上", en: "1 Samuel" },
    prompt: {
      zh: "以色列的第一位君王是谁？",
      en: "Who was the first king of Israel?",
    },
    options: [
      { zh: "大卫", en: "David" },
      { zh: "撒母耳", en: "Samuel" },
      { zh: "扫罗", en: "Saul" },
      { zh: "所罗门", en: "Solomon" },
    ],
    answerIndex: 2,
    reference: "1 Samuel 10:24",
    scripture: {
      zh: "撒母耳对众民说，你们看耶和华所拣选的人，众民就呼叫说，愿王万岁。",
      en: "Samuel said to the people, 'Do you see him whom the Lord has chosen?' And all the people shouted, 'Long live the king!'",
    },
    explanation: {
      zh: "扫罗被公开拣选并立为以色列的第一位王。",
      en: "Saul was publicly chosen and presented as Israel's first king.",
    },
  },
  {
    id: "samuel-goliath",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "简单", en: "Easy" },
    book: { zh: "撒母耳记上", en: "1 Samuel" },
    prompt: {
      zh: "大卫用机弦和石头击败了哪一个巨人？",
      en: "Which giant did David defeat with a sling and a stone?",
    },
    options: [
      { zh: "噩", en: "Og" },
      { zh: "歌利亚", en: "Goliath" },
      { zh: "西拿基立", en: "Sennacherib" },
      { zh: "尼布甲尼撒", en: "Nebuchadnezzar" },
    ],
    answerIndex: 1,
    reference: "1 Samuel 17:48-50",
    scripture: {
      zh: "大卫用机弦甩石，打入非利士人的额内，将他击倒在地。",
      en: "David hurled a stone from his sling, and it struck the Philistine on the forehead so that he fell to the ground.",
    },
    explanation: {
      zh: "大卫打败歌利亚，显明得胜在乎耶和华而不在乎兵器。",
      en: "David defeated Goliath in battle, showing that the victory belonged to the Lord.",
    },
  },
  {
    id: "kings-sheba",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "困难", en: "Hard" },
    book: { zh: "列王纪上", en: "1 Kings" },
    prompt: {
      zh: "是哪一位女王来见所罗门，用难题试问他？",
      en: "Which queen visited Solomon to test him with hard questions?",
    },
    options: [
      { zh: "波斯王后", en: "Queen of Persia" },
      { zh: "示巴女王", en: "Queen of Sheba" },
      { zh: "亚她利雅", en: "Queen Athaliah" },
      { zh: "瓦实提", en: "Queen Vashti" },
    ],
    answerIndex: 1,
    reference: "1 Kings 10:1-3",
    scripture: {
      zh: "示巴女王听见所罗门因耶和华之名所得的名声，就来用难解的话试问他。",
      en: "The queen of Sheba heard of Solomon's fame concerning the name of the Lord and came to test him with hard questions.",
    },
    explanation: {
      zh: "示巴女王听见所罗门的智慧和名声，便来到耶路撒冷试验他。",
      en: "The Queen of Sheba came to Jerusalem after hearing about Solomon's wisdom and fame.",
    },
  },
  {
    id: "kings-carmel",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "中等", en: "Medium" },
    book: { zh: "列王纪上", en: "1 Kings" },
    prompt: {
      zh: "哪一位先知在迦密山上对抗巴力的先知？",
      en: "Which prophet confronted the prophets of Baal on Mount Carmel?",
    },
    options: [
      { zh: "以利沙", en: "Elisha" },
      { zh: "以赛亚", en: "Isaiah" },
      { zh: "以利亚", en: "Elijah" },
      { zh: "耶利米", en: "Jeremiah" },
    ],
    answerIndex: 2,
    reference: "1 Kings 18:20-39",
    scripture: {
      zh: "以利亚说，那降火显应的神，就是神；于是耶和华的火降下，烧尽燔祭。",
      en: "Elijah said, 'The God who answers by fire, He is God,' and the fire of the Lord fell and consumed the sacrifice.",
    },
    explanation: {
      zh: "以利亚挑战巴力的先知，神亲自降火回应，显明唯有耶和华是真神。",
      en: "Elijah challenged the prophets of Baal and God answered with fire from heaven.",
    },
  },
  {
    id: "kings-naaman",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "困难", en: "Hard" },
    book: { zh: "列王纪下", en: "2 Kings" },
    prompt: {
      zh: "乃缦被吩咐要在哪一条河里洗七次？",
      en: "In which river was Naaman told to wash seven times?",
    },
    options: [
      { zh: "约旦河", en: "Jordan" },
      { zh: "尼罗河", en: "Nile" },
      { zh: "幼发拉底河", en: "Euphrates" },
      { zh: "雅博河", en: "Jabbok" },
    ],
    answerIndex: 0,
    reference: "2 Kings 5:10-14",
    scripture: {
      zh: "以利沙叫乃缦去约旦河沐浴七次，他的肉就复原，好像小孩子的肉。",
      en: "Elisha told Naaman to wash in the Jordan seven times, and his flesh was restored like the flesh of a little child.",
    },
    explanation: {
      zh: "以利沙吩咐乃缦去约旦河洗七次，结果他的痲疯就得了洁净。",
      en: "Elisha told Naaman to wash in the Jordan River, and he was healed of leprosy.",
    },
  },
  {
    id: "samuel-hannah",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "中等", en: "Medium" },
    book: { zh: "撒母耳记上", en: "1 Samuel" },
    prompt: {
      zh: "撒母耳的母亲是谁？",
      en: "Who was the mother of Samuel?",
    },
    options: [
      { zh: "路得", en: "Ruth" },
      { zh: "哈拿", en: "Hannah" },
      { zh: "底波拉", en: "Deborah" },
      { zh: "亚比该", en: "Abigail" },
    ],
    answerIndex: 1,
    reference: "1 Samuel 1:20",
    scripture: {
      zh: "哈拿怀孕生子，给他起名叫撒母耳，说，这是我从耶和华那里求来的。",
      en: "Hannah conceived and bore a son, and she named him Samuel, saying, 'I asked him of the Lord.'",
    },
    explanation: {
      zh: "哈拿恳切祷告求子，后来把撒母耳奉献给主。",
      en: "Hannah prayed earnestly for a son and later dedicated Samuel to the Lord.",
    },
  },
  {
    id: "jonah-fish",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "简单", en: "Easy" },
    book: { zh: "约拿书", en: "Jonah" },
    prompt: {
      zh: "哪一位先知曾被大鱼吞下？",
      en: "Which prophet was swallowed by a great fish?",
    },
    options: [
      { zh: "约拿", en: "Jonah" },
      { zh: "约珥", en: "Joel" },
      { zh: "弥迦", en: "Micah" },
      { zh: "那鸿", en: "Nahum" },
    ],
    answerIndex: 0,
    reference: "Jonah 1:17",
    scripture: {
      zh: "耶和华安排一条大鱼吞了约拿，他在鱼腹中三日三夜。",
      en: "The Lord appointed a great fish to swallow Jonah, and Jonah was in the belly of the fish three days and three nights.",
    },
    explanation: {
      zh: "约拿逃避神的差遣时，被神预备的大鱼吞下。",
      en: "Jonah was swallowed by a great fish after fleeing from the Lord's command.",
    },
  },
  {
    id: "daniel-lions",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "简单", en: "Easy" },
    book: { zh: "但以理书", en: "Daniel" },
    prompt: {
      zh: "谁被扔进了狮子坑？",
      en: "Who was thrown into the lions' den?",
    },
    options: [
      { zh: "以西结", en: "Ezekiel" },
      { zh: "但以理", en: "Daniel" },
      { zh: "尼希米", en: "Nehemiah" },
      { zh: "以斯拉", en: "Ezra" },
    ],
    answerIndex: 1,
    reference: "Daniel 6:16-23",
    scripture: {
      zh: "我的神差遣使者封住狮子的口，叫狮子不伤我。",
      en: "My God sent his angel and shut the lions' mouths, and they have not hurt me.",
    },
    explanation: {
      zh: "但以理因向神祷告被扔进狮子坑，但神保守了他。",
      en: "Daniel was thrown into the lions' den for praying to God, but God preserved him.",
    },
  },
  {
    id: "jeremiah-weeping",
    testament: { zh: "旧约", en: "Old Testament" },
    difficulty: { zh: "困难", en: "Hard" },
    book: { zh: "耶利米书", en: "Jeremiah" },
    prompt: {
      zh: "哪一位先知常被称为“流泪的先知”？",
      en: "Which prophet is often called the weeping prophet?",
    },
    options: [
      { zh: "以赛亚", en: "Isaiah" },
      { zh: "耶利米", en: "Jeremiah" },
      { zh: "何西阿", en: "Hosea" },
      { zh: "阿摩司", en: "Amos" },
    ],
    answerIndex: 1,
    reference: "Jeremiah 9:1",
    scripture: {
      zh: "但愿我的头为水，我的眼为泪的泉源，我好为我百姓中被杀的人昼夜哭泣。",
      en: "Oh that my head were waters and my eyes a fountain of tears, that I might weep day and night for the slain of my people.",
    },
    explanation: {
      zh: "耶利米因犹大的罪和将要来到的审判而满怀忧伤，因此被称为流泪的先知。",
      en: "Jeremiah's ministry was marked by deep sorrow over Judah's sin and coming judgment.",
    },
  },
  {
    id: "matthew-birth",
    testament: { zh: "新约", en: "New Testament" },
    difficulty: { zh: "简单", en: "Easy" },
    book: { zh: "路加福音", en: "Luke" },
    prompt: {
      zh: "耶稣出生在哪一座城？",
      en: "In what city was Jesus born?",
    },
    options: [
      { zh: "拿撒勒", en: "Nazareth" },
      { zh: "耶路撒冷", en: "Jerusalem" },
      { zh: "伯利恒", en: "Bethlehem" },
      { zh: "迦百农", en: "Capernaum" },
    ],
    answerIndex: 2,
    reference: "Luke 2:4-7",
    scripture: {
      zh: "马利亚在伯利恒生了头胎的儿子，用布包起来，放在马槽里。",
      en: "Mary gave birth to her firstborn son in Bethlehem, wrapped him in swaddling cloths, and laid him in a manger.",
    },
    explanation: {
      zh: "耶稣出生在伯利恒，成就了有关弥赛亚出生地的预言。",
      en: "Jesus was born in Bethlehem, fulfilling prophecy concerning the Messiah's birthplace.",
    },
  },
  {
    id: "matthew-baptizer",
    testament: { zh: "新约", en: "New Testament" },
    difficulty: { zh: "简单", en: "Easy" },
    book: { zh: "马太福音", en: "Matthew" },
    prompt: {
      zh: "是谁在约旦河里为耶稣施洗？",
      en: "Who baptized Jesus in the Jordan River?",
    },
    options: [
      { zh: "彼得", en: "Peter" },
      { zh: "施洗约翰", en: "John the Baptist" },
      { zh: "安得烈", en: "Andrew" },
      { zh: "腓力", en: "Philip" },
    ],
    answerIndex: 1,
    reference: "Matthew 3:13-17",
    scripture: {
      zh: "耶稣从加利利来到约旦河见约翰，要受他的洗；受洗后，圣灵仿佛鸽子降下。",
      en: "Jesus came from Galilee to the Jordan to be baptized by John, and after he was baptized the Spirit descended like a dove.",
    },
    explanation: {
      zh: "施洗约翰为耶稣施洗，当时圣灵仿佛鸽子降下。",
      en: "John the Baptist baptized Jesus, and the Spirit descended like a dove.",
    },
  },
  {
    id: "john-cana",
    testament: { zh: "新约", en: "New Testament" },
    difficulty: { zh: "中等", en: "Medium" },
    book: { zh: "约翰福音", en: "John" },
    prompt: {
      zh: "耶稣在迦拿行了什么神迹？",
      en: "What miracle did Jesus perform at Cana?",
    },
    options: [
      { zh: "医好一个瞎子", en: "He healed a blind man" },
      { zh: "平静风浪", en: "He calmed a storm" },
      { zh: "把水变成酒", en: "He turned water into wine" },
      { zh: "使饼增多", en: "He multiplied bread" },
    ],
    answerIndex: 2,
    reference: "John 2:1-11",
    scripture: {
      zh: "耶稣叫用人把缸倒满了水，又从水舀出来；那水就成了上好的酒。",
      en: "Jesus told the servants to fill the jars with water, and the water became fine wine.",
    },
    explanation: {
      zh: "在迦拿婚宴上，耶稣把水变成酒，这是约翰福音中记载的第一个神迹。",
      en: "At the wedding in Cana, Jesus turned water into wine as his first recorded sign in John's Gospel.",
    },
  },
  {
    id: "luke-zacchaeus",
    testament: { zh: "新约", en: "New Testament" },
    difficulty: { zh: "简单", en: "Easy" },
    book: { zh: "路加福音", en: "Luke" },
    prompt: {
      zh: "是谁爬上桑树，为了能看见耶稣？",
      en: "Who climbed a sycamore tree to see Jesus?",
    },
    options: [
      { zh: "尼哥底母", en: "Nicodemus" },
      { zh: "撒该", en: "Zacchaeus" },
      { zh: "巴底买", en: "Bartimaeus" },
      { zh: "睚鲁", en: "Jairus" },
    ],
    answerIndex: 1,
    reference: "Luke 19:1-4",
    scripture: {
      zh: "撒该跑到前头，爬上桑树，要看耶稣，因为耶稣必从那里经过。",
      en: "Zacchaeus ran ahead and climbed a sycamore tree to see Jesus, because Jesus was about to pass that way.",
    },
    explanation: {
      zh: "撒该因为个子矮，为了看见经过的耶稣，就爬上了桑树。",
      en: "Zacchaeus climbed a sycamore tree because he was short and wanted to see Jesus pass by.",
    },
  },
  {
    id: "luke-peter",
    testament: { zh: "新约", en: "New Testament" },
    difficulty: { zh: "简单", en: "Easy" },
    book: { zh: "路加福音", en: "Luke" },
    prompt: {
      zh: "鸡叫以前，哪一位门徒三次不认主？",
      en: "Which disciple denied Jesus three times before the rooster crowed?",
    },
    options: [
      { zh: "约翰", en: "John" },
      { zh: "多马", en: "Thomas" },
      { zh: "彼得", en: "Peter" },
      { zh: "马太", en: "Matthew" },
    ],
    answerIndex: 2,
    reference: "Luke 22:54-62",
    scripture: {
      zh: "鸡一叫，彼得就想起主的话，便出去痛哭。",
      en: "When the rooster crowed, Peter remembered the Lord's words and went out and wept bitterly.",
    },
    explanation: {
      zh: "彼得三次否认认识耶稣，正如耶稣预先告诉他的那样。",
      en: "Peter denied knowing Jesus three times, just as Jesus had predicted.",
    },
  },
  {
    id: "john-thomas",
    testament: { zh: "新约", en: "New Testament" },
    difficulty: { zh: "中等", en: "Medium" },
    book: { zh: "约翰福音", en: "John" },
    prompt: {
      zh: "哪一位门徒说，除非看见耶稣的钉痕，否则他不相信耶稣已经复活？",
      en: "Which disciple said he needed to see Jesus' wounds before he would believe the resurrection?",
    },
    options: [
      { zh: "雅各", en: "James" },
      { zh: "多马", en: "Thomas" },
      { zh: "犹大", en: "Jude" },
      { zh: "西门奋锐党", en: "Simon the Zealot" },
    ],
    answerIndex: 1,
    reference: "John 20:24-29",
    scripture: {
      zh: "多马说，我非看见他手上的钉痕，用指头探入那钉痕，又用手探入他的肋旁，我总不信。",
      en: "Thomas said, 'Unless I see the mark of the nails in his hands and put my finger into the mark of the nails and my hand into his side, I will never believe.'",
    },
    explanation: {
      zh: "多马起初怀疑，但见到复活的主后，他宣告“我的主，我的神”。",
      en: "Thomas doubted at first, but then confessed Jesus as 'My Lord and my God.'",
    },
  },
  {
    id: "matthew-five-thousand",
    testament: { zh: "新约", en: "New Testament" },
    difficulty: { zh: "中等", en: "Medium" },
    book: { zh: "马太福音", en: "Matthew" },
    prompt: {
      zh: "耶稣用什么喂饱了五千人？",
      en: "What did Jesus use to feed the five thousand?",
    },
    options: [
      { zh: "七个饼和几条鱼", en: "Seven loaves and a few fish" },
      { zh: "五个饼和两条鱼", en: "Five loaves and two fish" },
      { zh: "十二个饼和葡萄", en: "Twelve loaves and grapes" },
      { zh: "饼和蜜", en: "Bread and honey" },
    ],
    answerIndex: 1,
    reference: "Matthew 14:17-21",
    scripture: {
      zh: "耶稣拿着五个饼两条鱼，祝福擘开，递给门徒；众人都吃，并且吃饱了。",
      en: "Jesus took the five loaves and the two fish, blessed and broke them, gave them to the disciples, and all ate and were satisfied.",
    },
    explanation: {
      zh: "耶稣把五个饼、两条鱼擘开分给众人，不但吃饱，还剩下许多零碎。",
      en: "Jesus multiplied five loaves and two fish to feed the crowd, with leftovers remaining.",
    },
  },
  {
    id: "acts-prison",
    testament: { zh: "新约", en: "New Testament" },
    difficulty: { zh: "困难", en: "Hard" },
    book: { zh: "使徒行传", en: "Acts" },
    prompt: {
      zh: "在腓立比与保罗一同坐监、并在半夜唱诗赞美神的人是谁？",
      en: "Who was imprisoned with Paul in Philippi and sang hymns at midnight?",
    },
    options: [
      { zh: "巴拿巴", en: "Barnabas" },
      { zh: "提摩太", en: "Timothy" },
      { zh: "西拉", en: "Silas" },
      { zh: "亚波罗", en: "Apollos" },
    ],
    answerIndex: 2,
    reference: "Acts 16:22-25",
    scripture: {
      zh: "约在半夜，保罗和西拉祷告唱诗赞美神，众囚犯也侧耳而听。",
      en: "About midnight Paul and Silas were praying and singing hymns to God, and the prisoners were listening to them.",
    },
    explanation: {
      zh: "保罗和西拉在监里祷告唱诗，后来神用地震打开了监门。",
      en: "Paul and Silas prayed and sang hymns in prison before the earthquake opened the doors.",
    },
  },
  {
    id: "acts-paul",
    testament: { zh: "新约", en: "New Testament" },
    difficulty: { zh: "中等", en: "Medium" },
    book: { zh: "使徒行传", en: "Acts" },
    prompt: {
      zh: "扫罗悔改归主以后，在教会中服事时常用的新名字是什么？",
      en: "What was Saul's new name after his conversion and ministry among the churches?",
    },
    options: [
      { zh: "保罗", en: "Paul" },
      { zh: "马提亚", en: "Matthias" },
      { zh: "司提反", en: "Stephen" },
      { zh: "提多", en: "Titus" },
    ],
    answerIndex: 0,
    reference: "Acts 13:9",
    scripture: {
      zh: "扫罗又名保罗，被圣灵充满，定睛看着那人。",
      en: "Then Saul, who was also called Paul, filled with the Holy Spirit, looked intently at him.",
    },
    explanation: {
      zh: "扫罗，也就是保罗，后来成为写下许多新约书信的使徒。",
      en: "Saul, also called Paul, became the apostle who wrote many New Testament letters.",
    },
  },
  {
    id: "mark-levi",
    testament: { zh: "新约", en: "New Testament" },
    difficulty: { zh: "困难", en: "Hard" },
    book: { zh: "马可福音", en: "Mark" },
    prompt: {
      zh: "在跟随耶稣以前，哪一位门徒也被称为利未？",
      en: "Which disciple was also known as Levi before following Jesus?",
    },
    options: [
      { zh: "马太", en: "Matthew" },
      { zh: "巴多罗买", en: "Bartholomew" },
      { zh: "安得烈", en: "Andrew" },
      { zh: "达太", en: "Thaddaeus" },
    ],
    answerIndex: 0,
    reference: "Mark 2:14",
    scripture: {
      zh: "耶稣看见亚勒腓的儿子利未坐在税关上，就对他说，来跟从我；他就起来跟从了耶稣。",
      en: "Jesus saw Levi the son of Alphaeus sitting at the tax booth and said to him, 'Follow me.' And he rose and followed him.",
    },
    explanation: {
      zh: "福音书中所说的税吏利未，就是后来跟随耶稣的马太。",
      en: "Levi the tax collector is identified with Matthew in the Gospel accounts.",
    },
  },
  ],
};
