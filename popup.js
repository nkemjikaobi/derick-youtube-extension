document.addEventListener('DOMContentLoaded', async () => {
	const linkslist = document.getElementById('linkslist');
	const url = 'https://jqq-utils.netlify.app/api/recentYTVideos';

	const copy = e => {
		const str = e.target.dataset.url;
		const el = document.createElement('textarea');
		el.value = str;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
	};

	try {
		const res = await fetch(url);
		const videos = await res.json();
		const videosHTML = videos
			.map(video => {
				const videoURL = `https://www.youtube.com/watch?v=${video.videoId}`;
				return `<li class="video-link">
            <button class="btn" data-url="${videoURL}" >COPY</button>
            <a class="btn" href="${videoURL}" rel="noopener noreferrer" target="_blank">Watch</a>
            ${video.title}
            </li>`;
			})
			.join('');
		linkslist.innerHTML = videosHTML;
		const videoLinks = [...document.querySelectorAll('.video-link')];
		videoLinks.forEach(link => link.addEventListener('click', copy));
	} catch (error) {
		console.error(error);
	}
});
