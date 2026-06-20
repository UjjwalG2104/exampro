package com.secureai.exampro.service;

import com.secureai.exampro.entity.Exam;
import com.secureai.exampro.entity.ExamQuestion;
import com.secureai.exampro.entity.Question;

import com.secureai.exampro.repository.ExamRepository;
import com.secureai.exampro.repository.ExamQuestionRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamQuestionServiceImpl implements ExamQuestionService {

    private final ExamQuestionRepository examQuestionRepository;
    private final ExamRepository examRepository;

    public ExamQuestionServiceImpl(
            ExamQuestionRepository examQuestionRepository,
            ExamRepository examRepository) {

        this.examQuestionRepository = examQuestionRepository;
        this.examRepository = examRepository;
    }

    @Override
    public ExamQuestion addQuestionToExam(
            ExamQuestion examQuestion) {

        Exam exam = examQuestion.getExam();
        Question question = examQuestion.getQuestion();

        if (examQuestionRepository.existsByExamAndQuestion(
                exam, question)) {

            throw new RuntimeException(
                    "Question already exists in this exam!");
        }

        return examQuestionRepository.save(examQuestion);
    }

    @Override
    public List<ExamQuestion> getQuestionsByExam(
            Exam exam) {

        return examQuestionRepository
                .findByExamOrderByQuestionOrderAsc(exam);
    }

    @Override
    public List<ExamQuestion> getQuestionsByExamId(
            Long examId) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Exam not found"));

        return examQuestionRepository
                .findByExamOrderByQuestionOrderAsc(exam);
    }

    @Override
    public List<ExamQuestion> getAllExamQuestions() {

        return examQuestionRepository.findAll();
    }

    @Override
    public ExamQuestion getExamQuestionById(
            Long id) {

        return examQuestionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Exam Question not found"));
    }

    @Override
    public boolean existsQuestionInExam(
            Exam exam,
            Question question) {

        return examQuestionRepository
                .existsByExamAndQuestion(
                        exam,
                        question
                );
    }

    @Override
    public ExamQuestion updateExamQuestion(
            Long id,
            ExamQuestion examQuestion) {

        ExamQuestion existingQuestion =
                getExamQuestionById(id);

        existingQuestion.setQuestionOrder(
                examQuestion.getQuestionOrder());

        existingQuestion.setMarks(
                examQuestion.getMarks());

        return examQuestionRepository
                .save(existingQuestion);
    }

    @Override
    public void removeQuestionFromExam(
            Long id) {

        ExamQuestion examQuestion =
                getExamQuestionById(id);

        examQuestionRepository.delete(examQuestion);
    }

    @Override
    public long countQuestionsInExam(
            Exam exam) {

        return examQuestionRepository
                .countByExam(exam);
    }
}