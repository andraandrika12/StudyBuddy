import { FETCH_REDIRECT_URL, FETCH_USER_PROFILE } from "./actionTypes";
import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_LOCATIONS_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  FETCH_PROJECTS,
  FETCH_PROJECTS_BY_ID,
  FETCH_DASHBOARD_STUDENT,
  FETCH_DASHBOARD_TEACHER,
} from "./actionTypes";

import axios from "axios";
const baseUrl =
  "https://dd9c-2001-448a-11b0-13d6-b8a6-ba1d-3553-50e8.ngrok-free.app/";
let access_token;
let role;
export const fetchDashboardStudent = (data) => {
  return {
    type: FETCH_DASHBOARD_STUDENT,
    payload: data,
  };
};

export const fetchDashboardTeacher = (data) => {
  return {
    type: FETCH_DASHBOARD_TEACHER,
    payload: data,
  };
};

export const Login = (data, role) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { data, role },
  };
};

export const Logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const fetchProjects = (data) => {
  return {
    type: FETCH_PROJECTS,
    payload: data,
  };
};

export const fetchProjectById = (data) => {
  return {
    type: FETCH_PROJECTS_BY_ID,
    payload: data,
  };
};

// <><><><><><><><><>STUDDYBUDDDYYY><><><><><><><
export const registerUser = (registerForm) => {
  // (registerForm);;
  return async () => {
    try {
      const { data } = await axios({
        method: "post",
        url: baseUrl + "register",
        data: registerForm,
      });
      return { success: true, data }; // Return a success flag and data
    } catch (error) {
      error.response.data;
      return { success: false };
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      dispatch(Logout());
      access_token = ""
      return { success: true, data }; // Return a success flag and data
    } catch (error) {
      // Return an error flag and error data
      return { success: false };
    }
  };
};

export function getProjects() {
  return async (dispatch) => {
    try {
      const { data } = await axios(baseUrl + "pub/projects");
      // ("ACTION CREATOR>>>>>>>>>>", data);
      dispatch(fetchProjects(data));
    } catch (error) {
      return { success: false };
    }
  };
}

export function getProjectById(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios(baseUrl + "pub/projects/" + id);
      // ("ACTION CREATOR PROJECT ID>>>>>", data);
      dispatch(fetchProjectById(data));
    } catch (error) {
      return { success: false };
    }
  };
}

export const fetchLocations = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: baseUrl + "pub/locations",
      });
      dispatch({
        type: FETCH_LOCATIONS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: baseUrl + "pub/categories",
      });
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: data,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateStatusRole = (role) => {
  return async () => {
    try {
      const { data } = await axios({
        method: "patch",
        url: baseUrl + "users",
        data: { role },
        headers: {
          access_token: access_token,
        },
      });
      dispatch(fetchUserProfile(access_token, role));
      return { success: true }; // Return a success flag and data
    } catch (error) {
      console.log(error.response.data);
      return { success: false };
    }
  };
};

export const addSpecialization = (data) => {
  let specialist = [];
  data.map((e) => {
    specialist.push({ categoryId: e });
  });
  return async () => {
    try {
      const { data } = await axios({
        method: "post",
        url: baseUrl + "specialist",
        data: { specialist },
        headers: {
          access_token: access_token,
        },
      });
      dispatch(fetchUserProfile(access_token, role));
      return { success: true };
    } catch (error) {
      console.log(error.response.data);
      return { success: false };
    }
  };
};

export const fetchDashboardForStudent = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: baseUrl + "student_profile",
        headers: {
          access_token: access_token,
        },
      });
      dispatch(fetchDashboardStudent(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchDashboardForTeacher = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: baseUrl + "buddy_profile",
        headers: {
          access_token: access_token,
        },
      });
      dispatch(fetchDashboardTeacher(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUserProfile = (token, role) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: baseUrl + role + "_profile",
        headers: {
          access_token: token,
        },
      });
      dispatch({
        type: FETCH_USER_PROFILE,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const editProfile = (access_token, form) => {
  return async () => {
    try {
      const { data } = await axios({
        method: "put",
        url: baseUrl + "users",
        data: form,
        headers: {
          access_token,
        },
      });

      console.log(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const searchBuddy = (category, region) => {
  return async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: baseUrl + `categories/${category}?address=${region}`,
        headers: {
          access_token,
        },
      });

      const transformedData = {
        Teacher: data.specialists.map((specialist) => ({
          id: specialist.Teacher._id,
          username: specialist.Teacher.username,
          categoryId: specialist.categoryId,
        })),
      };
      return transformedData;
    } catch (error) {
      return { success: false };
    }
  };
};

export const addProject = (name, teacherId, description, categoryId, goals) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: baseUrl + `projects`,
        headers: {
          access_token,
        },
        data: {
          name,
          teacherId,
          description,
          categoryId,
          goals,
        },
      });

      if (role === "buddy") {
        await dispatch(fetchDashboardForTeacher());
      } else if (role === "student") {
        await dispatch(fetchDashboardForStudent());
      }

      dispatch(fetchProjects())

      console.log("a")
      return { success: true };
    } catch (error) {
      console.log(error)
      return { success: false };
    }
  };
};

export const updateStatusProject = (status, id) => {
  return async () => {
    try {
      const { data } = await axios({
        method: "PATCH",
        url: baseUrl + `projects/` + id,
        headers: {
          access_token,
        },
        data: {
          status,
        },
      });

      if (role === "buddy") {
        await dispatch(fetchDashboardForTeacher());
      } else if (role === "student") {
        await dispatch(fetchDashboardForStudent());
      }

      console.log(data);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };
};

export const payment = (projectId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'post',
        url: baseUrl + 'generate-midtrans-token/' + projectId,
        data: {
          price: 500000
        },
        headers: {
          access_token: access_token
        }
      })
      dispatch({
        type: FETCH_REDIRECT_URL,
        payload: data
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const loginUser = (loginForm) => {
  return async (dispatch) => {
    const { username, password } = loginForm;
    try {
      const { data } = await axios.post(baseUrl + "login", {
        email: username,
        password: password,
      });

      role = await data.role;
      access_token = await data.access_token;

      dispatch(Login(data.access_token, data.role));

      await dispatch(fetchCategories());
      await dispatch(fetchLocations());

      if (role === "buddy") {
        await dispatch(fetchDashboardForTeacher());
      } else if (role === "student") {
        await dispatch(fetchDashboardForStudent());
      }
      dispatch(fetchUserProfile(data.access_token, data.role));
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };
};
