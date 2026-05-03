import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ContentCategory, ContentPlanItem, GeneratorSettings, CATEGORY_LIST, SHORT_CATEGORY_NAMES } from "../types";

const FOOTER_SIGNATURE = `

——————————————————
HỆ THỐNG ANH NGỮ QUỐC TẾ QUEEN - EASY ENGLISH, EASY LIFE !
☎️Hotline: 0866 444 324 - 0866 112 213
📩Inbox page: Hệ thống anh ngữ quốc tế Queen
https://www.facebook.com/anhnguquoctequeen
🏫Địa chỉ: Lô 19-20-21, KDC Phú Gia 2, Nguyễn Khuyến, Phường Trảng Dài, TP,Biên Hoà, T.Đồng Nai.`;

const ENGLISH_CONTENT_GUIDE = `
Bạn là một chuyên gia Content Marketing cho Trung tâm Anh ngữ. Nhiệm vụ của bạn là lập kế hoạch nội dung chi tiết.
Dựa trên các nhóm bài viết sau:

1. Tiếng Anh Giao tiếp: Giới thiệu khóa học, tình huống giao tiếp thực tế, từ vựng theo chủ đề.
2. Luyện thi IELTS: Chiến lược làm bài, giải đề, chia sẻ kinh nghiệm đạt điểm cao, giới thiệu khóa học.
3. Tiếng Anh 1:1 Online: Lợi ích học 1 kèm 1, sự tiện lợi, lộ trình cá nhân hóa.
4. Tiếng Anh Trẻ em & Thiếu niên: Phương pháp học vui nhộn, phát triển kỹ năng toàn diện, hình ảnh lớp học.
5. Khuyến mãi & Học phí: Chương trình giảm giá, học bổng, ưu đãi đăng ký sớm.
6. Sự kiện & Hoạt động: Câu lạc bộ tiếng Anh, ngoại khóa, hội thảo, lễ hội.
7. Feedback & Thành tích: Cảm nhận học viên, bảng điểm IELTS, video nói tiếng Anh của học viên.
8. Kiến thức & Mẹo học: Ngữ pháp, từ vựng, phát âm, phương pháp tự học hiệu quả.
9. Truyền cảm hứng & Tư duy: Bài viết dạng tâm sự, chia sẻ quan điểm giáo dục, thấu hiểu tâm lý. YÊU CẦU ĐẶC BIỆT: VIẾT NGẮN GỌN (dưới 150 chữ). TUYỆT ĐỐI KHÔNG quảng cáo, KHÔNG giới thiệu khóa học, KHÔNG nhắc đến tên trung tâm "Queen" hay "Queen English" trong nội dung. Chỉ tập trung truyền cảm hứng thuần túy. KHÔNG dùng gạch đầu dòng, CHỈ DÙNG 1-2 icon nhẹ nhàng (như 💛, 🌱) hoặc KHÔNG DÙNG ICON.

Cấu trúc bài viết chuẩn chăm sóc Fanpage Facebook (Có thể rút gọn nếu yêu cầu viết ngắn):
- Tiêu đề (Hook): Viết hoa, giật tít hấp dẫn, có emoji thu hút để giữ chân người đọc.
- Dẫn dắt (Lead-in): Ngắn gọn, đánh trúng tâm lý, nỗi đau hoặc mong muốn của học viên/phụ huynh.
- Nội dung chính (Body): Trình bày rõ ràng. Giữa các phần phải có khoảng trắng (cách dòng) hợp lý để bài viết thoáng mắt, không bị dính chữ.
- Kêu gọi hành động (CTA): Rõ ràng, khuyến khích tương tác (inbox, comment, đăng ký học).
- Hashtag: Phù hợp với chủ đề.

VĂN PHONG VÀ CÁCH TRÌNH BÀY MẪU (THAM KHẢO):
CÓ 2 PHONG CÁCH VIẾT HOÀN TOÀN KHÁC BIỆT:

1. PHONG CÁCH BÌNH THƯỜNG (Dành cho nhóm 1 đến 8):
- Năng lượng tích cực, thân thiện, cởi mở, bắt trend.
- SỬ DỤNG NHIỀU EMOJI (ICON) sinh động, thu hút ở tiêu đề, đầu dòng và cuối câu.
- Luôn xưng hô là "Queen English" hoặc "Queen".
- Luôn có lời kêu gọi hành động (CTA) mạnh mẽ.

2. PHONG CÁCH TRUYỀN CẢM HỨNG & TƯ DUY (Chỉ dành riêng cho nhóm 9):
- Viết dạng tâm sự, nhẹ nhàng, sâu sắc, thấu hiểu tâm lý.
- KHÔNG DÙNG ICON (hoặc chỉ dùng 1-2 icon rất nhẹ nhàng như 💛, 🌱 ở cuối bài).
- TUYỆT ĐỐI KHÔNG quảng cáo, KHÔNG nhắc đến tên trung tâm "Queen" hay "Queen English".
- VIẾT RẤT NGẮN GỌN (dưới 150 chữ).

Dưới đây là các ví dụ chuẩn về cách ngắt dòng, hành văn và sử dụng emoji cho PHONG CÁCH BÌNH THƯỜNG:

Ví dụ 1 (Khóa học trẻ em):
"🚨 ÉT Ô ÉT! BA MẸ ĐAU ĐẦU VÌ TÌM CHỖ HỌC TIẾNG ANH CHO CON? 🚨

Giao diện thì rạng rỡ, nhưng hệ điều hành của con lại "báo lỗi" mỗi khi nhắc đến việc học tiếng Anh? Ba mẹ bận rộn không có thời gian đưa đón xa xôi?

Đừng lo, đã có Queen English ở đây "giải cứu" ba mẹ đây! 🦸‍♀️

Hiểu được nỗi lòng của phụ huynh, Hệ thống Anh ngữ Quốc tế Queen đã phủ sóng các khu vực trọng điểm để mang lớp học đến thật gần nhà mình. Đặc biệt, Queen cực kỳ "mát tay" với các bạn nhỏ từ Cấp Tiểu học, Cấp 2 cho đến Mầm non và Cấp 3 đó nha!

📍 Cùng điểm danh 3 "đại bản doanh" xịn sò của Queen nhé:
🏰 Chi nhánh QUEEN: Dành riêng cho team Trảng Dài. Gần nhà, tiện lợi, học vui hết nấc!
🏰 Chi nhánh THIÊN VĂN: Phủ sóng Tân Phong, Thạnh Phú (Vĩnh Cửu) và khu vực Trảng Dài giáp Tân Phong. Ba mẹ đi làm về đón con cực kỳ tiện đường.
🏰 Chi nhánh QUEEN LONG BÌNH: "Cứ điểm" yêu thích của các bạn nhỏ khu vực An Bình và Long Bình.

✨ Ở Queen, tiếng Anh không phải là môn học thuộc lòng nhàm chán, mà là một hành trình khám phá đầy tiếng cười. Đội ngũ giáo viên siêu tâm lý sẽ giúp các con "bật công tắc" tự tin, phát âm chuẩn chỉnh ngay từ nhỏ.

👇 Ba mẹ ở khu vực nào, mau mau để lại bình luận hoặc nhắn tin cho Queen để nhận ngay lịch test trình độ và lộ trình học miễn phí cho bé yêu nhé!"

Ví dụ 2 (Tiếng Anh giao tiếp):
"🛑 SƠ HỞ LÀ "HELLO, I'M FINE THANK YOU, AND YOU?" 🥲

Có phải mỗi lần gặp người nước ngoài, não bộ của bạn tự động "đóng băng", miệng lắp bắp và chỉ nhớ đúng một câu cửa miệng từ thời tiểu học?

Đó là biểu hiện của "Hội chứng sợ Tây" kết hợp với việc học ngữ pháp quá nhiều nhưng lại thiếu môi trường thực hành đấy!

Nhưng đừng lo, Queen English sẽ giúp bạn "F5" lại kỹ năng giao tiếp chỉ sau một khóa học! 🚀

Tại sao lớp Giao tiếp tại Queen lại khiến học viên mê mẩn?
💬 Học là Dùng Được Ngay: Không lý thuyết suông, Queen tập trung vào các tình huống thực tế: đi làm, du lịch, mua sắm, phỏng vấn...
💬 Môi Trường "Tắm" Tiếng Anh: Ép bạn phải mở miệng, sửa lỗi phát âm ngay tại trận một cách tinh tế và duyên dáng nhất.
💬 Đội Ngũ Giáo Viên "Bắt Trend": Không khí lớp học luôn rộn ràng, vui vẻ, giúp bạn xóa bỏ hoàn toàn sự tự ti.

✨ Dù bạn là người đi làm bận rộn hay sinh viên đang cần tiếng Anh để ra trường, Queen đều có lộ trình "đo ni đóng giày" cho riêng bạn.

👉 Inbox ngay cho Queen để nhận trọn bộ cẩm nang "Phá băng giao tiếp" và giữ chỗ cho khóa học tháng này nhé!"

Ví dụ 3 (IELTS):
"🎯 ĐỪNG ĐỂ IELTS READING "THAO TÚNG TÂM LÝ" BẠN NỮA! 🧠

Làm bài Reading mà cứ như đang chơi trò trốn tìm? Tìm thấy từ khóa (keyword) y chang trong bài đọc, mừng rỡ khoanh ngay đáp án... và rồi nhận kết quả SAI BÉT? 😭

Xin chúc mừng, bạn đã sập bẫy của người ra đề!

Hôm nay, Queen English sẽ "bóc phốt" thủ thuật Paraphrasing – vũ khí tối thượng giúp bạn thoát khỏi ma trận lừa tình của IELTS Reading.

💡 BÍ KÍP TỪ QUEEN:
1️⃣ Đừng bao giờ tìm từ giống hệt: Đề bài dùng "increase", trong bài đọc chắc chắn sẽ là "go up", "rise", "surge" hoặc "grow". Hãy tìm TỪ ĐỒNG NGHĨA, đừng tìm từ giống nhau!
2️⃣ Cẩn thận với từ mang nghĩa phủ định: Đôi khi đề bài có từ "NOT", "HARDLY", "RARELY" bị giấu rất khéo. Đọc lướt là mất điểm oan ngay.
3️⃣ Quản lý thời gian kiểu "tổng tài": Không cần hiểu 100% từ vựng trong bài. Hãy áp dụng thuần thục Skimming (đọc lướt lấy ý chính) và Scanning (quét tìm thông tin cụ thể).

✨ Tại lớp IELTS của Queen English, các giáo viên siêu xịn sẽ hướng dẫn bạn chi tiết từng chiến thuật làm bài, giải phẫu từng dạng đề để bạn đi thi với một tâm thế "đỉnh nóc, kịch trần" nhất!

👉 Bạn đang kẹt ở band điểm nào? Comment ngay số điểm mục tiêu của bạn, Queen sẽ gửi tặng lộ trình luyện thi cá nhân hóa hoàn toàn miễn phí nhé!"

Ví dụ 4 (Học qua hoạt hình):
"🎬 TOP 3 BỘ HOẠT HÌNH GIÚP BÉ "TẮM" TIẾNG ANH SIÊU CUỐN! 🍿

Cho con xem tivi thì sợ hại mắt, nhưng không cho xem thì con lại chán? 
Giải pháp hoàn hảo cho ba mẹ đây: Hãy biến giờ xem tivi thành giờ "tắm" tiếng Anh với 3 bộ phim hoạt hình kinh điển, vừa giải trí vừa luyện nghe cực đỉnh! 📺✨

Queen English gợi ý ba mẹ các siêu phẩm sau:

🐷 1. Peppa Pig (Heo Peppa)
- Phù hợp: Mầm non, Tiểu học.
- Lý do: Mỗi tập chỉ 5 phút, xoay quanh các chủ đề gia đình, bạn bè cực kỳ gần gũi. Giọng Anh-Anh cực chuẩn, tốc độ nói chậm rãi, từ vựng lặp đi lặp lại giúp bé dễ dàng ghi nhớ.

🐶 2. Bluey (Chú chó Bluey)
- Phù hợp: Mầm non, Tiểu học.
- Lý do: Bộ phim đạt vô số giải thưởng quốc tế! Không chỉ giúp bé học tiếng Anh giao tiếp tự nhiên qua các trò chơi sáng tạo, Bluey còn dạy bé (và cả ba mẹ) những bài học sâu sắc về gia đình.

🐕 3. Martha Speaks (Cô chó Martha biết nói)
- Phù hợp: Cấp 1, Cấp 2.
- Lý do: Bộ phim được thiết kế đặc biệt để dạy từ vựng! Mỗi tập sẽ tập trung vào một nhóm từ vựng cụ thể, được giải thích rõ ràng qua các tình huống hài hước của cô chó Martha.

💡 Lời khuyên từ Queen: Ba mẹ hãy cùng xem với con, bắt chước lại các câu thoại vui nhộn trong phim để tạo không khí hào hứng nhé!

👉 Nếu ba mẹ muốn con có một môi trường tương tác thực tế với giáo viên nước ngoài giống hệt như trong phim, hãy nhắn tin ngay cho Queen English để đăng ký lớp học trải nghiệm nhé!"

Ví dụ 5 (Tiếng Anh 1:1 Online):
"Bạn sợ đám đông? Bạn bận rộn với mớ công việc ngập đầu không có thời gian đến trung tâm? Nhìn người ta "bắn" tiếng Anh ầm ầm mà lòng thầm ghen tị? 🥲

Bỏ túi ngay giải pháp CHÂN ÁI dành cho hội người đi làm bận rộn & hướng nội: CHƯƠNG TRÌNH TIẾNG ANH 1:1 ONLINE TẠI QUEEN ENGLISH! 🌟

💡 Lợi ích "đỉnh nóc kịch trần":
✅ Lộ trình CÁ NHÂN HÓA 100%, học đúng cái bạn cần, không học lan man.
✅ Tương tác trực tiếp 1:1 với Giáo viên Việt Nam hoặc Philippines - Không sợ ngại, sai đâu sửa đó!
✅ Thời gian linh hoạt, rảnh lúc nào học lúc đó, ngồi tại nhà mặc đồ pijama vẫn học ngon lành. 🛌

Bắt đầu thay đổi cuộc đời bằng vốn tiếng Anh xịn xò ngay hôm nay. Nhắn tin cho Queen để nhận tư vấn lộ trình riêng nhé! 📩"

Ví dụ 6 (Mẹo dạy con tại nhà):
"🤫 BÍ KÍP "DỤ" TRẺ NÓI TIẾNG ANH TẠI NHÀ CỰC MƯỢT! 🏡

"Con ơi nói tiếng Anh cho mẹ nghe xem nào?" - Trẻ lắc đầu quay đi. 🙅‍♂️
"Quả táo tiếng Anh là gì con?" - Trẻ im lặng. 😶

Ba mẹ có đang mắc lỗi "khảo bài" khiến con áp lực và sợ nói tiếng Anh ở nhà không? Đừng ép con, hãy thử 3 tuyệt chiêu "lạt mềm buộc chặt" này từ Queen nhé: 

🎨 1. Chơi trò "Giả vờ mất trí nhớ":
Thay vì hỏi "Cái này tiếng Anh là gì?", ba mẹ hãy vờ quên: "Oh no, mẹ quên mất quả chuối gọi là gì rồi, Banana hay Apple nhỉ?". Trẻ con rất thích cảm giác được làm "thầy" để sửa lỗi cho người lớn đó!

🎶 2. Hát Karaoke tiếng Anh:
Mở những bài hát tiếng Anh bắt tai trên Youtube và cùng con nhảy múa, hát theo. Không cần chuẩn 100%, quan trọng là con thấy vui và quen với âm điệu.

🧸 3. Gán tiếng Anh vào đồ vật yêu thích:
Đừng bắt con học từ vựng xa xôi. Con thích siêu nhân? Dạy từ vựng về siêu nhân. Con thích búp bê? Dạy từ vựng về quần áo búp bê.

🏰 Ba mẹ ở khu vực Tân Phong, Thạnh Phú (Vĩnh Cửu) ơi! Nếu ba mẹ quá bận rộn không có thời gian tương tác cùng con, hãy để chi nhánh THIÊN VĂN của Queen English đồng hành nhé. 

Với thế mạnh đào tạo từ Mầm non đến Cấp 3, Queen tự hào mang đến môi trường học tập vui nhộn, không áp lực, giúp con tự động "bật công tắc" tiếng Anh mà không cần ai ép buộc! 

👉 Ba mẹ thả tim nếu thấy bài viết hữu ích và inbox ngay cho Queen để nhận bài test năng lực miễn phí cho con nhé!"

Ví dụ 7 (Q&A IELTS/Giao tiếp):
"Tuần qua inbox của Queen nổ tung với hàng loạt câu hỏi từ các "tấm chiếu mới" chuẩn bị dấn thân vào con đường IELTS và Tiếng Anh giao tiếp. Cùng chuyên gia nhà Queen giải mã nhé! 🕵️‍♂️

❓ Q1: Em mất gốc hoàn toàn, học 14 tháng lên được 7.0 thật không ạ?
✅ A: Hoàn toàn ĐƯỢC! Với lộ trình thiết kế tinh gọn, phương pháp Tấn Siêu Trí Nhớ và sự kèm cặp 24/7 của giáo viên từng kỹ năng, Queen cam kết đầu ra cho bạn. Chỉ cần bạn đi đúng lộ trình!

❓ Q2: Em đi làm ca kíp không cố định, sao học IELTS được?
✅ A: Queen có cả lớp IELTS Online và Offline. Nếu lịch quá khó, khóa Online 1:1 chính là "chân ái" với thời gian linh hoạt hoàn toàn theo lịch của bạn.

❓ Q3: Học Online 1:1 giáo viên có sát sao không?
✅ A: Học 1 thầy 1 trò, bạn không thể... trốn đi đâu được! Giáo viên VN hoặc Philippines sẽ sửa từng lỗi phát âm, ngữ pháp ngay lập tức.

Bạn còn câu hỏi nào hóc búa hơn không? Comment ngay bên dưới để Queen giải đáp tuốt tuồn tuột nhé! 👇"

Ví dụ 8 (Thuyết trình tiếng Anh):
"Ba mẹ có tin không? Mới học lớp 2 thôi nhưng các "mầm non" nhà Queen English đã tự tin đứng thuyết trình tiếng Anh dõng dạc rồi đấy! 🎤

Tại Queen English, chúng tôi không dạy trẻ học vẹt. Chương trình Tiếng Anh Giao Tiếp Offline được thiết kế chuẩn Anh/Mỹ (Oxford, Cambridge) mang đến trải nghiệm đột phá:
🌟 Tập trung 100% vào NGHE - NÓI và tương tác.
🌟 Giáo viên Việt Nam nhưng sử dụng 80-100% tiếng Anh trong lớp, tạo môi trường "tắm" ngôn ngữ chuẩn chỉnh.
🌟 Rèn luyện kỹ năng THUYẾT TRÌNH ngay từ lớp 2, giúp con dạn dĩ, tự tin trước đám đông.

Đặc biệt, Queen có các cơ sở rộng rãi, an toàn ngay tại Trảng Dài, Thiên Văn (Tân Phong) và Long Bình. Đưa đón con cực tiện lợi!

Ba mẹ muốn con tự tin tỏa sáng? Nhắn ngay cho Queen để nhận lịch test năng lực MIỄN PHÍ cho bé nhé! 🎁"

Ví dụ 9 (Truyền cảm hứng & Tư duy - Viết kiểu tâm sự, nhẹ nhàng, sâu sắc):
"ĐỘNG VIÊN ĐÚNG GIÚP CON TIẾN BỘ NHANH HƠN 💛

Không phải lời khen nào cũng tạo động lực. Và không phải sự nghiêm khắc nào cũng giúp con trưởng thành. Điều quan trọng nằm ở cách ba mẹ động viên.

Thay vì nói: "Con giỏi quá!", ba mẹ có thể nói: "Con đã cố gắng rất nhiều cho bài này."
Thay vì: "Sao con làm chưa tốt?", hãy thử: "Chỗ này mình cùng sửa lại để lần sau làm tốt hơn nhé."

Khi lời động viên tập trung vào nỗ lực và quá trình, con sẽ hiểu rằng tiến bộ đến từ sự cố gắng, không phải từ việc phải hoàn hảo. Một đứa trẻ được ghi nhận đúng cách sẽ tự tin hơn, dám thử lại khi sai, và tiến bộ bền vững hơn theo thời gian.

Đôi khi chỉ cần đổi một câu nói, kết quả học tập của con cũng sẽ thay đổi rất nhiều. Ba mẹ hãy kiên nhẫn với con nhé! 💛"

Ví dụ 10 (Truyền cảm hứng & Tư duy - Góc nhìn/Triết lý giáo dục):
"ĐỪNG ĐỢI CON CÓ VẤN ĐỀ MỚI BẮT ĐẦU ⏳

Rất nhiều ba mẹ chỉ tìm lớp học khi con mất gốc, sợ nói, hoặc điểm số bắt đầu giảm. Nhưng giáo dục hiệu quả nhất không phải là “chữa cháy”, mà là xây nền tảng trước khi khó khăn xuất hiện.

Khi bắt đầu sớm và đúng cách, con sẽ hình thành thói quen học tập đều đặn, tự tin giao tiếp ngay từ những bước nhỏ và hiểu bài chắc hơn thay vì học đối phó. Ngược lại, khi chờ đến lúc con thật sự gặp vấn đề mới bắt đầu, việc học thường nặng nề hơn vì con vừa phải sửa lỗ hổng cũ, vừa theo kịp kiến thức mới.

Đầu tư đúng thời điểm không phải để con học nhiều hơn, mà để con có sự chuẩn bị vững vàng. Khi nền tảng đã chắc, hành trình phía sau sẽ nhẹ nhàng và tự tin hơn rất nhiều. 🌱"

Yêu cầu về văn phong:
- Lời văn THANH THOÁT, tự nhiên, mượt mà. Tránh lối viết quảng cáo quá cứng nhắc, hô hào sáo rỗng hay nhồi nhét từ khóa khiên cưỡng.
- Câu cú uyển chuyển, ngắn gọn, súc tích, mang lại cảm giác dễ chịu, gần gũi cho người đọc.
- Hình ảnh/Video mô tả chân thực, sinh động, truyền cảm hứng học tập.
- Ngôn ngữ phù hợp với từng đối tượng (trẻ trung cho học sinh, chuyên nghiệp cho người đi làm).
- Sử dụng emoji hợp lý, vừa phải để làm nổi bật ý chính.
- Chuẩn SEO nhưng vẫn phải giữ được sự tự nhiên.
- TRONG TRƯỜNG "content", BẮT BUỘC SỬ DỤNG KÝ TỰ XUỐNG DÒNG (\\n) ĐỂ TẠO CÁC ĐOẠN VĂN NGẮN, CÁCH DÒNG RÕ RÀNG NHƯ VÍ DỤ TRÊN. KHÔNG VIẾT MỘT ĐOẠN VĂN DÀI NGOẰNG DÍNH LIỀN NHAU.
`;

const responseSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      purpose: { type: Type.STRING, description: "Mục đích của bài viết (Thuộc nhóm nào)" },
      topic: { type: Type.STRING, description: "Chủ đề chính của bài viết" },
      note: { type: Type.STRING, description: "Ghi chú đặc biệt cho bài viết (nếu có)" },
      title: { type: Type.STRING, description: "Tiêu đề bài viết hấp dẫn, chuẩn SEO" },
      content: { type: Type.STRING, description: "Nội dung chi tiết của bài viết, bao gồm cả emoji và CTA (KHÔNG bao gồm chữ ký cuối)" },
      visuals: { type: Type.STRING, description: "Mô tả chi tiết về Hình ảnh hoặc Video cần có" },
      designBrief: { type: Type.STRING, description: "Hướng dẫn thiết kế (Tone màu, font chữ, bố cục) hoặc hướng dẫn chụp ảnh" },
      hashtags: { type: Type.STRING, description: "Các hashtag phù hợp" },
    },
    required: ["purpose", "topic", "title", "content", "visuals", "designBrief", "hashtags"],
  },
};

const getTonePrompt = (tone: string) => {
  switch (tone) {
    case 'expert': return "Ưu tiên giọng văn Chuyên gia, Uy tín, Khoa học nhưng vẫn thanh thoát, dễ hiểu.";
    case 'friendly': return "Ưu tiên giọng văn Thân thiện, Nhẹ nhàng, thanh thoát, như đang tâm tình với khách hàng.";
    case 'trendy': return "Ưu tiên giọng văn Hài hước, Trẻ trung, Bắt trend mạng xã hội nhưng vẫn giữ được sự thanh thoát, duyên dáng.";
    default: return "Sử dụng linh hoạt các giọng văn khác nhau (Chuyên gia, Thân thiện, Hài hước) tùy thuộc vào từng chủ đề cụ thể để tạo sự đa dạng, nhưng luôn giữ tiêu chí lời văn thanh thoát, tự nhiên.";
  }
};

const getAudiencePrompt = (audience: string) => {
  switch (audience) {
    case 'students': return "Tập trung vào đối tượng Học sinh, sinh viên (Cần chứng chỉ, giao tiếp cơ bản, năng động).";
    case 'workers': return "Tập trung vào đối tượng Người đi làm (Bận rộn, cần tiếng Anh giao tiếp công việc, thăng tiến).";
    case 'parents': return "Tập trung vào đối tượng Phụ huynh (Quan tâm đến tương lai con cái, môi trường học tập).";
    case 'kids': return "Tập trung vào đối tượng Trẻ em (Học qua trò chơi, hình ảnh bắt mắt, vui nhộn).";
    default: return "Hướng đến đa dạng các nhóm khách hàng khác nhau cho từng bài viết để phủ rộng thị trường.";
  }
};

const getLengthPrompt = (length: string) => {
  switch (length) {
    case 'short': return "ĐỘ DÀI: RẤT NGẮN (Dưới 100 chữ). Viết cực kỳ súc tích, đi thẳng vào vấn đề (dạng caption ngắn, giật tít). Bỏ qua các phần dẫn dắt dài dòng, gộp chung Body và CTA cho thật gọn. KHÔNG viết dài.";
    case 'medium': return "ĐỘ DÀI: VỪA PHẢI (Khoảng 150 - 250 chữ). Đầy đủ thông tin nhưng không quá dài dòng.";
    case 'long': return "ĐỘ DÀI: DÀI (Trên 300 chữ). Viết chi tiết, chuyên sâu (dạng bài blog/kiến thức), giải thích cặn kẽ vấn đề.";
    default: return "ĐỘ DÀI: ĐA DẠNG. Hãy xen kẽ các bài rất ngắn (dưới 100 chữ) và các bài vừa phải (150-200 chữ). Hạn chế viết quá dài lê thê.";
  }
};

const getSegmentPrompt = (segment: string) => {
  switch (segment) {
    case 'kids': return "BẮT BUỘC: TẤT CẢ các bài viết CHỈ tập trung vào phân khúc TRẺ EM & THIẾU NIÊN (Mầm non, Tiểu học, THCS). Đối tượng hướng tới là Phụ huynh hoặc các bé. TUYỆT ĐỐI KHÔNG viết về khóa học cho người đi làm hay sinh viên.";
    case 'adults': return "BẮT BUỘC: TẤT CẢ các bài viết CHỈ tập trung vào phân khúc NGƯỜI LỚN (Sinh viên, Người đi làm, Luyện thi IELTS, Giao tiếp công sở). TUYỆT ĐỐI KHÔNG viết về khóa học cho trẻ em hay mầm non.";
    default: return "Phân bổ nội dung đa dạng cho cả khóa học Trẻ em và Người lớn.";
  }
};

const getDistributionPrompt = (settings: GeneratorSettings) => {
  if (settings.category !== ContentCategory.ALL) return "";

  let distPrompt = "PHÂN BỔ TỶ LỆ CÁC LOẠI BÀI VIẾT (Ước lượng mong muốn của người dùng):\n";
  let hasCustom = false;
  
  CATEGORY_LIST.forEach(cat => {
    const weight = settings.purposeWeights[cat];
    if (weight !== undefined) {
       distPrompt += `- ${SHORT_CATEGORY_NAMES[cat]}: Khoảng ${weight}%\n`;
       hasCustom = true;
    }
  });

  return hasCustom ? distPrompt : "";
};

export const generateContentPlan = async (
  settings: GeneratorSettings
): Promise<ContentPlanItem[]> => {
  const customKey = settings.customApiKey?.trim();
  const apiKey = customKey || process.env.GEMINI_API_KEY || process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key is missing. Please provide a custom API key or ensure environment variables are set.");
  }

  console.log(customKey ? "Using CUSTOM API KEY" : "Using DEFAULT ENVIRONMENT API KEY");

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Hãy viết ${settings.count} bài content cho Trung tâm Anh ngữ.
    
    1. PHẠM VI CHỦ ĐỀ & PHÂN BỔ:
    Tập trung vào nhóm: ${settings.category}.
    ${getSegmentPrompt(settings.courseSegment)}
    ${settings.category === ContentCategory.ALL ? "Hãy phân bổ các nhóm chủ đề để đa dạng nội dung theo tỷ lệ bên dưới." : ""}
    ${getDistributionPrompt(settings)}
    (Lưu ý: Nếu tổng tỷ lệ không tròn 100%, hãy tự cân đối hợp lý để có kế hoạch đa dạng nhất).
    
    2. ĐỊNH DẠNG VISUAL:
    - Tỷ lệ Video vs Hình ảnh: Khoảng ${settings.videoPercentage}% là VIDEO, còn lại ${100 - settings.videoPercentage}% là HÌNH ẢNH.
    - Phong cách Visual: Khoảng ${settings.designPercentage}% là HÌNH THIẾT KẾ (Banner/Graphic), ${100 - settings.designPercentage}% là HÌNH ẢNH THỰC TẾ.
    
    3. PHONG CÁCH VIẾT (Tone & Mood):
    - ${getTonePrompt(settings.tone)}
    - ${getAudiencePrompt(settings.targetAudience)}
    - ${getLengthPrompt(settings.postLength)}

    4. LƯU Ý QUAN TRỌNG TỪ NGƯỜI DÙNG:
    "${settings.customPrompt}"
    
    5. KIẾN THỨC CHUYÊN MÔN & SỰ THẬT (BẮT BUỘC):
    "${settings.knowledgeBase}"
    (TUYỆT ĐỐI tuân thủ các thông tin khóa học, giá cả và quy trình được cung cấp ở trên. Sử dụng chúng làm cơ sở sự thật để viết bài, tránh bịa đặt sai lệch kiến thức chuyên môn).

    6. YÊU CẦU ĐẶC BIỆT:
    - Các thông số trên là định hướng. Hãy linh hoạt điều chỉnh cho phù hợp với từng chủ đề cụ thể để nội dung TỰ NHIÊN và KHÔNG RẬP KHUÔN.
    - Hãy trả về kết quả dưới dạng JSON Array theo đúng Schema đã định nghĩa.
    - TRONG TRƯỜNG "content", HÃY VIẾT ĐÚNG CHUẨN BÀI ĐĂNG CHĂM SÓC FANPAGE FACEBOOK. NẾU YÊU CẦU VIẾT NGẮN, HÃY RÚT GỌN TỐI ĐA, BỎ QUA CÁC PHẦN RƯỜM RÀ.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: [
        { role: "user", parts: [{ text: ENGLISH_CONTENT_GUIDE + "\n" + prompt }] },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.75, // Slightly increased for more creativity/diversity
      },
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    const data = JSON.parse(jsonText) as ContentPlanItem[];
    
    // Post-process to append the footer
    return data.map(item => {
      // Không thêm footer (chữ ký) vào các bài Truyền cảm hứng để tránh cảm giác quảng cáo
      const purposeLower = (item.purpose || "").toLowerCase();
      const topicLower = (item.topic || "").toLowerCase();
      const isInspirational = purposeLower.includes("truyền cảm hứng") || purposeLower.includes("tư duy") || topicLower.includes("truyền cảm hứng");
      
      return {
        ...item,
        content: isInspirational ? item.content : item.content + FOOTER_SIGNATURE
      };
    });

  } catch (error: any) {
    console.error("Error generating content:", error);
    
    // Handle specific API errors
    const errorMessage = error?.message || "";
    if (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("RESOURCE_EXHAUSTED")) {
      throw new Error("API Key đã vượt quá giới hạn sử dụng (Quota Exceeded). Vui lòng nhập Custom API Key của bạn trong phần cài đặt hoặc thử lại sau.");
    }
    
    throw error;
  }
};