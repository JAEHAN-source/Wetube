import routes from "../routes";
import Video from "../models/Video"

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ _id: -1 });
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }
}

export const video = (req, res) => res.render("videos", { pageTitle: "Video" });

export const search = async (req, res) => {
    let videos = [];
    const { query: { term: searchingBy } } = req;

    try {
        videos = await Video.find({
            title: { $regex: searchingBy, $options: "i" }
        })
    } catch (error) {
        console.log(error)
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos });
}

export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {

    console.log(req.file);
    const {
        body: { title, description },
        file: { path }
    } = req;
    //to do: upload and save video
    console.log(path);
    const newVideo = await Video.create({
        fileUrl: path.replace(/\\/g, "/"),
        title,
        description,

    });
    console.log(newVideo);

    res.redirect(routes.videoDetail(newVideo.id));
}

export const videoDetail = async (req, res) => {
    //req.params.id
    console.log(req.params.id)
    const { params: { id } } = req;

    try {
        const video = await Video.findById(id);

        res.render("videoDetail", { pageTitle: "Video detail", video: video });
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("editVideo", { pageTitle: `edit ${video.title}`, video })
    } catch (error) {
        res.redirect(routes.home);
    }

}
export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;
    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));

    } catch (error) {
        res.redirect(routes.home);
    }
    res.redirect(routes.videoDetail(id))
}

export const deleteVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        await Video.findOneAndRemove({ _id: id });
        res.redirect(routes.home);
    } catch (error) {
        console.log(error)
    }
    res.redirect(routes.home)
}


