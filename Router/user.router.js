import express from 'express'
import mongoose from "mongoose";
import { ObjectId } from 'mongodb';
import { question } from '../Controllers/user.controller.js'
import User from '../Models/user.schema.js';

const router=express.Router()

router.post("/question",question)
router.get("/", async (req, res) => {
    const error = {
      message: "Error in retrieving questions",
      error: "Bad request",
    };
  
    User.aggregate([
      {
        $lookup: {
          from: "comments",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                comment: 1,
                created_at: 1,
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "answers",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
              },
            },
          ],
          as: "answerDetails",
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ])
      .exec()
      .then((questionDetails) => {
        res.status(200).send(questionDetails);
      })
      .catch((e) => {
        console.log("Error: ", e);
        res.status(400).send(error);
      });
  });

router.get("/:id", async (req, res) => {
    try {
        // console.log(req.params)
      User.aggregate([
        // {
        //   $match: { _id:new ObjectId(req.params.id) },
        // },
        {
          $lookup: {
            from: "answers",
            let: { question_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$question_id", "$$question_id"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  user: 1,
                  answer: 1,
                  question_id: 1,
                  created_at: 1,
                },
              },
            ],
            as: "answerDetails",
          },
        },
        {
          $lookup: {
            from: "comments",
            let: { question_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$question_id", "$$question_id"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  question_id: 1,
                  user: 1,
                  comment: 1,
                  created_at: 1,
                },
              },
            ],
            as: "comments",
          },
        },
        {
          $project: {
            __v: 0,
          },
        },
      ])
        .exec()
        .then((questionDetails) => {
          res.status(200).send(questionDetails);
        })
        .catch((e) => {
          console.log("Error: ", e);
          res.status(400).send(e);
        });
    } catch (err) {
        console.log(err)
      res.status(400).send({
        message: "Question not found",
      });
    }
  });

export default router